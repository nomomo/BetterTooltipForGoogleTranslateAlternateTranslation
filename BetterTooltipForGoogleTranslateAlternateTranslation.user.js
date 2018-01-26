// ==UserScript==
// @name        BetterTooltipForGoogleTranslateAlternateTranslation
// @namespace   BetterTooltipForGoogleTranslateAlternateTranslation
// @author      Nomomo
// @description Alternative translation tooltips are not cropped by the screen even if there is a lot of content to translate through Google Translate.
// @version     0.0.1
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @include     https://translate.google.*
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @updateURL   https://raw.githubusercontent.com/nomomo/BetterTooltipForGoogleTranslateAlternateTranslation/master/BetterTooltipForGoogleTranslateAlternateTranslation.user.js
// @downloadURL https://raw.githubusercontent.com/nomomo/BetterTooltipForGoogleTranslateAlternateTranslation/master/BetterTooltipForGoogleTranslateAlternateTranslation.user.js
// ==/UserScript==
/*jshint multistr: true */
(async() => {
    var Width_Tooltip_Target_Language = await GM.getValue('Width_Tooltip_Target_Language',400);
    var Width_Tooltip_Original_Language = await GM.getValue('Width_Tooltip_Original_Language',400);

    async function makeDOE(){
        if(!$.isNumeric(Width_Tooltip_Target_Language) || !$.isNumeric(Width_Tooltip_Original_Language)){
            alert("~ Better Tooltip For GoogleTranslate Alternate Translation~ \n Tooltip width is not a number. The Setting is reset.");
            await GM.setValue('Width_Tooltip_Target_Language',400);
            await GM.setValue('Width_Tooltip_Original_Language',400);
        }
        if($("#BetterTooltopStyle").length === 0){
            $("#BetterTooltopStyle").remove();
        }
        var BetterTooltopStyle="\
            <style id='BetterTooltopStyle' type='text/css'>\
                .goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem{\
                    white-space: normal !important;\
                    max-width:"+Width_Tooltip_Target_Language+"px;\
                }\
                .goog-menu.round-trip-content{\
                    white-space: normal !important;\
                    max-width:"+Width_Tooltip_Original_Language+"px;\
                }\
            </style>\
        ";
        $("head").append(BetterTooltopStyle);
    }
    $(document).on("ready", () => {
        makeDOE();
        $("div.gt-ft-promos").append("<a id='Better_Tooltip_Setting'><span class='gt-ft-mkt-icon' style='cursor:pointer;'>Better Tooltip Setting</span></a>");
    });

    $(document).on("click", "#Better_Tooltip_Setting", async(event) => {
        event.preventDefault();
        var Local_Width_Tooltip_Target_Language = prompt("Please enter tooltip width for target language", Width_Tooltip_Target_Language);
        if(Local_Width_Tooltip_Target_Language === null){
            alert('Cancel button was clicked. The settings will not be saved.');
            return false;
        }
        var Local_Width_Tooltip_Original_Language = prompt("Please enter tooltip width for original language", Width_Tooltip_Original_Language);
        if(Local_Width_Tooltip_Original_Language === null){
            alert('Cancel button was clicked. The settings will not be saved.');
            return false;
        }
        if($.isNumeric(Local_Width_Tooltip_Target_Language) && $.isNumeric(Local_Width_Tooltip_Original_Language)){
            Width_Tooltip_Target_Language = Local_Width_Tooltip_Target_Language;
            Width_Tooltip_Original_Language = Local_Width_Tooltip_Original_Language;
            await GM.setValue('Width_Tooltip_Target_Language',Width_Tooltip_Target_Language);
            await GM.setValue('Width_Tooltip_Original_Language',Width_Tooltip_Original_Language);
            makeDOE();
            alert("Tooltip width setting result\nTarget Language:"+Width_Tooltip_Target_Language+"\nOriginal Language:"+Width_Tooltip_Original_Language);
        }
        else{
            alert("Input value must be a number. The settings will not be saved.\nTarget Language:"+Width_Tooltip_Target_Language+"\nOriginal Language:"+Width_Tooltip_Original_Language);
        }
    });
})();
