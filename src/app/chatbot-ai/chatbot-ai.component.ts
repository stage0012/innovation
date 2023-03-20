import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../service/message.service';
import { HttpClient } from '@angular/common/http';
import { VoiceRecognitionService } from '../service/voice-recognition.service';


declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
export interface Message {
  type: string;
  text?: string; 
  message: string;
  likes: string;
  dislikes: string;
 
}
@Component({
  selector: 'app-chatbot-ai',
  templateUrl: './chatbot-ai.component.html',
  styleUrls: ['./chatbot-ai.component.scss']
})export class ChatbotAiComponent implements OnInit {

  recognition: any;
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('scrollMe', { static: true }) private myScrollContainer: any; 
  toggle = true;
  status = 'Enable';
  iconColor = 'black';

  // Define isListening property
  isListening = false;

  constructor(
    public service: VoiceRecognitionService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.service.init();
    this.messages.push({
      type: 'client',
      message: "Hi, I'm chatty, a virtual assistant powered by Artificial Intelligence and Natural Language Processing. I'm here to help with a variety of tasks, such as answering general questions. Try asking me some of the examples below to get started!",
      likes:"" ,
      dislikes: ""
   
    });
  }


  ngOnInit(): void {


    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
  
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
  
        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript;
        

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
  
        if (finalTranscript.trim() !== '') {
          this.chatForm.get('message')?.setValue(finalTranscript);
          this.sendMessage();
        }
      };
    }
  }
  

  likeMessage(message: any): void {
    message.likes++;
  }
  
  dislikeMessage(message: any): void {
    message.dislikes++;
  }
  


  openSupportPopup(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message: sentMessage,
      likes: "",
      dislikes: ""
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
      this.loading = false;
      this.messages.push({
        type: 'chatbot',
        message: response.message,
        likes: "",
       dislikes: "",
      });
      
    
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {}
    }, 150);
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

  listen() {
    if ('webkitSpeechRecognition' in window) {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      } else {
        this.recognition.start();
        this.isListening = true;
     

      }
    }
  }
  



}
