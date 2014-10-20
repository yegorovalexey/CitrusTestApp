<?php
//sleep(1);
define("NOT_CHECK_PERMISSIONS",true);
define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php"); 
require ($_SERVER['DOCUMENT_ROOT'] . '/bitrix/templates/main-template/catalog-functions.php');
require_once $_SERVER['DOCUMENT_ROOT'] . '/ajax/functions.php';
$objImageGd = new Vi_Image_Gd();
mysql_query ("set character_set_client='cp1251'");
mysql_query ("set character_set_results='cp1251'");
mysql_query ("set collation_connection='cp1251_general_ci'");
CModule::IncludeModule('iblock'); 
CModule::IncludeModule('catalog'); 


$root = array();
//--------------------------------------------------------------------------
function resize_img($image_id, $ppi)			
{			
	//определяем новый габарит картинки
	if($ppi<=1){$w_max=64; $h_max=64;}
	elseif($ppi>1 AND $ppi<=1.5){$w_max=48; $h_max=48;}
	elseif($ppi>1.5 AND $ppi<=2){$w_max=64; $h_max=64;}
	elseif($ppi>2){$w_max=96; $h_max=96;}
	
	//получаем данный исходной картинки
	$sql="SELECT * FROM b_file WHERE (ID=".$image_id.")";
	$result = mysql_query($sql);
	if($r = mysql_fetch_array($result))
	{
		$o_w=$r['WIDTH'];
		$o_h=$r['HEIGHT'];
		$dir=$r['SUBDIR'];
		$fname=$r['FILE_NAME'];
	}
	
	$filePath='/var/www/citrus.ua/public/upload/'.$dir.'/'.$fname; //полный путь к картинке
	if(file_exists($filePath))
	{
	$filePath=iconv("CP1251","UTF-8",$filePath);
	if(preg_match('/[а-яА-Я]/i', $filePath))
	{
		
		return false;
	}
	else 
	{
		$p=strpos($fname, '.');
		$new_name=substr($fname, 0, $p).'_'.$w_max.substr($fname, $p);
		$dest='/var/www/citrus.ua/public/upload/mobile/'.$new_name; //новая картинка

		if (!file_exists($dest)) 
		{
			$thumb = new Imagick();
			$thumb->readImage($filePath);  
			//$thumb->setImageResolution(72,72); 
			//$thumb->resampleImage(72,72,imagick::FILTER_UNDEFINED,1); 
				
			$thumb->scaleImage($w_max,$h_max,true);

			$thumb->sharpenImage(1,0.5);	
			$thumb->writeImage($dest);
			$thumb->clear();
			$thumb->destroy(); 
					
					
			//return $CDN_URL.$path.md5($srcFile."_".$newWidth."_".$newHeight).".jpg";
		}
		$new_url='http://www.citrus.ua/upload/mobile/'.$new_name;
		return $new_url;
	}
	}else {return false;}
}

//-----------------------------------------------------------------------------------

function get_news_list($start, $step, $ppi)
{
	$items=array();
	$stepped=0;
	$all_c=0;
	$arFilter2 = Array("IBLOCK_ID"=>32, "ACTIVE"=>"Y");
	$arSelect2 = Array("ID");
	$arSort2 = Array("ID"=>"DESC");
	$res2 = CIBlockElement::GetList($arSort2, $arFilter2, false, false, $arSelect2);
	while($ob2 = $res2->GetNextElement()){$all_c++;}
	$root['parameters']['all_items']=$all_c;
	if($step>0){$page=floor($start/$step)+1;
		$arNavStartParams=array('iNumPage'=>$page, 'nPageSize'=>$step+1, 'bShowAll'=>'N');
	}
	else {$arNavStartParams=false;}
	
	//$arFilter2 = Array("IBLOCK_ID"=>3, "ACTIVE"=>"Y");
	$arSelect2 = Array("ID", "NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE");
	$arSort2 = Array("ID"=>"DESC");
	$res2 = CIBlockElement::GetList($arSort2, $arFilter2, false, $arNavStartParams, $arSelect2);
	while($ob2 = $res2->GetNextElement())
	{
		$arFields2 = $ob2->GetFields();
		if($step>0)
		{
			if($stepped<$step)
			{
				$item=array('id'=>iconv("CP1251","UTF-8",$arFields2['ID']),
				'name'=>iconv("CP1251","UTF-8",$arFields2['NAME']),
				'text'=>iconv("CP1251","UTF-8",$arFields2['PREVIEW_TEXT']),
				);
				if($arFields2['PREVIEW_PICTURE']>0)
				{
					//$img=resize_img($arFields2['PREVIEW_PICTURE'], $ppi);
					$img=get_image($arFields2['PREVIEW_PICTURE'], $ppi);
					if($img!=false){$item+=array('pic'=>$img);}
				}
				
				$root['items'][]=$item;
				$stepped++;
			}
			elseif ($stepped==$step AND $start+$step<$all_c)
			{
				$root['parameters']['lazy']=1;
			}
		}
		else 
		{
			$item=array('id'=>iconv("CP1251","UTF-8",$arFields2['ID']),
				'name'=>iconv("CP1251","UTF-8",$arFields2['NAME']),
				'text'=>iconv("CP1251","UTF-8",$arFields2['PREVIEW_TEXT'])
				);
			$root['items'][]=$item;
		}
	}
	return $root;
}

//------------------------------------------------------------------- 

function get_news_id($id, $ppi)
{
	$arNavStartParams=false;
	$arFilter2 = Array("IBLOCK_ID"=>32, "ACTIVE"=>"Y", "ID"=>$id);
	$arSelect2 = Array("ID", "NAME", "DETAIL_TEXT");
	$arSort2 = Array("ID"=>"DESC");
	$res2 = CIBlockElement::GetList($arSort2, $arFilter2, false, $arNavStartParams, $arSelect2);
	while($ob2 = $res2->GetNextElement())
	{
		$arFields2 = $ob2->GetFields();
		$root=array('id'=>iconv("CP1251","UTF-8",$arFields2['ID']),
		'name'=>iconv("CP1251","UTF-8",$arFields2['NAME']),
		'text'=>iconv("CP1251","UTF-8",$arFields2['DETAIL_TEXT']),
		);
		
	}
	return $root;
}
//------------------------------------------------------------------- 

$start=0; $step=0;
if($_REQUEST['ppi']>0){$ppi=$_REQUEST['ppi'];}else{$ppi=1;}
$start=$_REQUEST['position'];         //уже загружено
$step=$_REQUEST['count'];    //сколько еще надо

if($_REQUEST["id"]>0)
{
	$root=get_news_id($_REQUEST["id"], $ppi);
}
else 
{
	$root=get_news_list($start, $step, $ppi);
}

/*
echo '<pre>';
print_r($root);
echo '</pre>';
*/
echo json_encode($root);
?>