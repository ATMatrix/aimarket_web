'use strict';

import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva';

function VoiceInput({dispatch, final_span, interim_span}) {
  
  window.addEventListener('load', function() {
    startButton();
  })


  var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];



var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
let final_span_temp;
let interim_span_temp;
if (!('webkitSpeechRecognition' in window)) {
  console.log('webkitSpeechRecognition not in window')
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      console.log('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      console.log('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        console.log('info_blocked');
      } else {
        console.log('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      console.log('info_start');
      return;
    }

    // if (window.getSelection) {
    //   window.getSelection().removeAllRanges();
    //   var range = document.createRange();
    //   range.selectNode(document.getElementById('final_span'));
    //   window.getSelection().addRange(range);
    // }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span_temp = linebreak(final_transcript);
    console.log(final_span_temp);
    interim_span_temp = linebreak(interim_transcript);
    console.log(interim_span_temp)   
    dispatch({
      type: 'voiceInput/setFinalSpan',
      payload: final_span_temp
    })
    dispatch({
      type: 'voiceInput/setInterimSpan',
      payload: interim_span_temp
    }) 
    if (final_transcript || interim_transcript) {

    }
  };
}


var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'cmn-Hans-CN';
  recognition.start();
  ignore_onend = false;
  start_timestamp = new Date().getTime();
}


  return (

    <div key="results" style={{
                      flex:0.7,
                   display:'flex' ,
                alignItems: 'flex-start',
    }}>
      <Input key="final_span" style={{ 
                              color: 'black',
                       paddingRight: 5,
                           }}
                           value={final_span}></Input>
      <Input key="interim_span" style={{ 
                              color: 'gray',
                           flexWrap:'nowrap'
                              }}
                              value={interim_span}></Input>
    </div>
  );
}

function mapStateToProps(state) {
  const { final_span } = state.voiceInput;
  const { interim_span } = state.voiceInput;
  return {
    final_span,
    interim_span,
  };
}
export default connect(mapStateToProps)(VoiceInput)
