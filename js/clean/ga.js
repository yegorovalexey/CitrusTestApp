function InitGA(){

    document.addEventListener("deviceready", function(){

        window.analytics.startTrackerWithId('UA-2170097-21');
        console_log("GA Init");
    });

}

function GA_track(page){

    if(page = ""){
        page = "Главная страница";
    }

    window.analytics.trackView(page);

    console_log("page: " + page);
}

function GA_event(Category,Action,Label,Value){
    window.analytics.trackEvent(Category, Action, Label, Value);  //Label and Value are optional, Value is numeric
}

function GA_set_id(id){
    window.analytics.setUserId(id);
    console_log("userID: " + id);
}



//InitGA();