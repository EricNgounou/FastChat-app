'use strict';
import newMessage from './model.js';

const account1 = {
  name: 'Yukio Taisei',
  password: 11111,
  picture: 'sources/channel-pictures/my-channel.jpeg',
  friends: new Map([
    [
      'Rioto Yoshimassa',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Tomy Shan',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Yuing Son',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
  ]),
  // messagesCount:
};

const account2 = {
  name: 'Rioto Yoshimassa',
  password: 22222,
  picture: 'sources/channel-pictures/channel-5.jpeg',
  friends: new Map([
    [
      'Yukio Taisei',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Tomy Shan',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Yuing Son',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
  ]),
};

const account3 = {
  name: 'Tomy Shan',
  password: 33333,
  picture: 'sources/channel-pictures/channel-2.jpeg',
  friends: new Map([
    [
      'Rioto Yoshimassa',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Yukio Taisei',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Yuing Son',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
  ]),
};

const account4 = {
  name: 'Yuing Son',
  password: 44444,
  picture: 'sources/channel-pictures/channel-3.jpeg',
  friends: new Map([
    [
      'Rioto Yoshimassa',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Tomy Shan',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
    [
      'Yukio Taisei',
      {
        newMessagesCount: 0,
        chats: null,
      },
    ],
  ]),
};

const accounts = [account1, account2, account3, account4];

const computeSudo = function (accs) {
  accs.forEach(acc => {
    acc.sudoName = acc.name.slice(0, acc.name.indexOf(' ')).toLowerCase();
  });
};
computeSudo(accounts);

let curSlides = 0;
const maxSlides = document.querySelectorAll('.slide').length;
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.right-btn');
const btnLeft = document.querySelector('.left-btn');
const chatMainView = document.querySelector('.chat-view-main');

const messages = document
  .querySelector('.message-container')
  .querySelectorAll('.message');

const loginBox = document.querySelector('.login-box');
const appBox = document.querySelector('.app-box');
const chatBoxPreview = document.querySelector('.chats-box-preview');
const userPicture = document.querySelector('.user-picture');
const userNameField = document.querySelector('.user-name');
const userPasswordField = document.querySelector('.user-password');
const loginMessage = document.querySelector('.login-message');
const senderIndex = document.querySelector('.sender-index');
const messageContainer = document.querySelector('.message-container');
const messageStatus = document.querySelector('.message-status');
let messageInput;
let tempMessage;
const slideCanceller = function () {
  slides.forEach((slide, i) => {
    slide.style.transform = 'unset';
  });
};
let isSlideActivated = false;
if (window.innerWidth <= 700) isSlideActivated = true;

window.addEventListener('resize', function () {
  if (window.innerWidth <= 700) {
    isSlideActivated = true;
    goToSlide(curSlides);
    console.log(window.innerWidth);
  } else {
    slideCanceller();
    isSlideActivated = false;
  }
});

const goToSlide = function (s) {
  if (!isSlideActivated) return;
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
  );

  console.log(s);

  if (s === 0) btnLeft.classList.add('hidden');
  else btnLeft.classList.remove('hidden');

  if (s === maxSlides - 1) btnRight.classList.add('hidden');
  else btnRight.classList.remove('hidden');
};

const updateFriendIndex = function (friendName, accs) {
  senderIndex.innerHTML = '';
  const friendAcc = accs.find(a => a.name === friendName);
  const friendInfo = `  
   <div class="picture">
    <img class="profile" src="${friendAcc.picture}" />
    <div class="hidden online-status"></div>
    </div>
    <span class="name">${
      friendAcc.sudoName[0].toUpperCase() + friendAcc.sudoName.slice(1)
    }</span>
    `;
  senderIndex.insertAdjacentHTML('afterbegin', friendInfo);
};

const updateChatView = function (friendName, curAcc, accs) {
  messageContainer.innerHTML = '';

  const friendAcc = accs.find(a => a.name === friendName);

  const mainMessage = `
  <div class="main-message">
  <div class="message-body">
  <p>Chat easily and faster</p>
  </div>
  </div>
  `;
  messageContainer.insertAdjacentHTML('afterbegin', mainMessage);

  let curMessage = curAcc.friends.get(friendName).chats;

  if (curMessage?.message) {
    while (curMessage) {
      const mess = `
    <div class="message ${curMessage.index}-message">
      <div class="message-body">
       <p class="text">${curMessage.message}</p>
       <p class="time receiving-time">4:58</p>
       <div class="picture">
       <img
    class="profile"
      src="${curMessage.index === 'user' ? curAcc.picture : friendAcc.picture}"
        />
         </div>
      </div>
      </div>
              `;
      messageContainer.insertAdjacentHTML('beforeend', mess);
      curMessage = curMessage.next;
    }
  } else {
    const tempMess = `
      <div class="temporary-message">
      <div class="message-body">
      <p>
      Start to Chat                     
      </p>               
      </div>                
      </div>`;
    messageContainer.insertAdjacentHTML('beforeend', tempMess);
  }
  const inputArea = `<form class="input-area">
    <input class="message-input"
     type="text" placeholder="New message"/>
    <button class="send-btn">
    <img class="send-icon" src="sources/icons/send icon.png" />
    </button>
  </form>`;

  messageContainer.insertAdjacentHTML('beforeend', inputArea);
  return friendAcc;
};

const updateChatPreview = function (account) {
  chatBoxPreview.innerHTML = '';
  let messageChecker = 0;
  Array.from(account.friends).forEach(friend => {
    const friendAcc = accounts.find(acc => acc.name === friend[0]);
    const newMess = friend[1].newMessagesCount;
    messageChecker += newMess;

    let lastMessage = friend[1].chats;

    while (lastMessage?.next) {
      lastMessage = lastMessage.next;
    }
    lastMessage = lastMessage ? lastMessage.message : lastMessage;

    const chatPreview = `
    <div class="chat-preview" data-name = "${friendAcc.name}">
        <div class="sender-picture">
          <img
            class="sender-profile"
            src="${friendAcc.picture}"
          />
          <span class="${
            newMess ? '' : 'hidden'
          } newmessage-status">${newMess}</span>
        </div>

        <div class="chat-body-preview">
          <div class="chat-info">
            <div class="chat-ref">
              <p class="sender-name">${friendAcc.name}</p>
            </div>
            <span class="time-preview">4:58 PM</span>
          </div>
          <p class="message-preview">
           ${
             lastMessage?.length < 45
               ? lastMessage
               : lastMessage
               ? lastMessage.slice(0, 45) + '...'
               : 'Start to chat'
           }
          </p>
        </div> 
        
        <div class="chat-preview-options">
          <div class="icon">
          <img class="markasread-icon" src="sources/icons/markasread-icon.png">
          <p class="markasread">Mark as read</p>
          </div>          
          <div class="icon">
          <img class="delete-icon" src="sources/icons/delete-icon.png">
          <p class="delete">Delete</p>
          </div>
      </div>
      </div> `;
    chatBoxPreview.insertAdjacentHTML('beforeend', chatPreview);
  });
  // if (messageChecker !== 0) {
  //   messageStatus.textContent = messageChecker;
  //   messageStatus.classList.remove("hidden");
  // } else messageStatus.classList.add("hidden");
};

const updateUI = function (account) {
  userPicture.innerHTML = '';
  const userProfile = `
  <img class="user-profile" src="${account.picture}" /> 
  <span class="online-status"></span>
  `;
  userPicture.insertAdjacentHTML('beforeend', userProfile);
  updateChatPreview(account);

  goToSlide(curSlides);
};

const updateMessages = function (curAccount, message, name, messCount = 0) {
  let chat = curAccount.friends.get(name).chats;
  curAccount.friends.get(name).newMessagesCount = messCount;
  if (!chat) {
    curAccount.friends.get(name).chats = message;
    return;
  }
  while (chat.next) {
    chat = chat.next;
  }
  chat.next = message;
};
let curUserAccount;
let curFriendAccount;

['submit', 'click'].forEach(event =>
  document.querySelector('.box').addEventListener(event, function (e) {
    if (event === 'click') {
      const chat = e.target.closest('.chat-preview');
      const rightSlide = e.target.closest('.right-btn');
      const leftSlide = e.target.closest('.left-btn');
      const logOut = e.target.closest('.logout');
      if (chat) {
        chatMainView.style.display = 'none';
        const fName = chat.dataset.name;
        // messageStatus.textContent =
        //   +messageStatus.textContent -
        //   curUserAccount.friends.get(fName).newMessagesCount;
        // messageStatus.textContent == "0" &&
        //   messageStatus.classList.add("hidden");
        curUserAccount.friends.get(fName).newMessagesCount = 0;
        chat.querySelector('.newmessage-status').classList.add('hidden');
        updateFriendIndex(fName, accounts);
        curFriendAccount = updateChatView(fName, curUserAccount, accounts);
        messageInput = document.querySelector('.message-input');
        tempMessage = document.querySelector('.temporary-message');
        isSlideActivated && curSlides++;
        goToSlide(curSlides);
      }

      if (rightSlide) {
        curSlides++;
        goToSlide(curSlides);
      }

      if (leftSlide) {
        curSlides--;
        goToSlide(curSlides);
      }

      if (logOut) {
        loginBox.classList.remove('hidden');
        appBox.style.opacity = 0;
        curSlides = 0;
        chatMainView.style.display = 'flex';
        loginMessage.textContent = 'Log into your account';
        loginMessage.style.color = '#20f4ff';
      }
    }

    if (event === 'submit') {
      e.preventDefault();
      const send = e.target.closest('.input-area');
      const login = e.target.closest('.login-space');

      if (login) {
        curUserAccount = accounts.find(
          acc => acc.sudoName === userNameField.value.trim()
        );
        if (curUserAccount?.password === +userPasswordField.value) {
          loginBox.classList.add('hidden');
          appBox.style.opacity = 1;
          userNameField.value = userPasswordField.value = '';
          updateUI(curUserAccount);
          messageContainer.innerHTML = '';
        } else {
          loginMessage.textContent =
            'Failed to find your account! Please check if you properly entered your sudo name and your password :)';
          loginMessage.style.color = '#ff1824';
        }
      }

      if (send) {
        const messageVal = messageInput.value;
        if (messageVal === '' || messageVal.split('').every(str => str === ' '))
          return;
        const messageSend = new newMessage('user', messageVal.trim());
        const messageReceived = new newMessage('sender', messageVal.trim());
        const fMessageCount = curFriendAccount.friends.get(
          curUserAccount.name
        ).newMessagesCount;
        updateMessages(curUserAccount, messageSend, curFriendAccount.name);
        updateMessages(
          curFriendAccount,
          messageReceived,
          curUserAccount.name,
          fMessageCount !== 0 ? fMessageCount + 1 : 1
        );
        console.log(accounts);

        updateChatView(curFriendAccount.name, curUserAccount, accounts);
        updateChatPreview(curUserAccount);
        messageInput = document.querySelector('.message-input');
        tempMessage = document.querySelector('.temporary-message');

        if (tempMessage) tempMessage.style.display = 'none';
        messageInput.value = '';
      }
    }
  })
);

// console.log(new newMessage('user', 'hello'));
