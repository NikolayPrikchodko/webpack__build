import 'babel-polyfill';
import './styles/style.css';
import IMask from 'imask';
import moment from 'moment';

let btnPay = document.getElementById('btn-pay');
btnPay.setAttribute('disabled', 'disabled');
const formInput = document.querySelectorAll('.form-input');
const emaillExpression = /\.[a-z]{2,6}$/i;
const card = document.getElementById('card');
const data = document.getElementById('data');
const code = document.getElementById('code');
const email = document.getElementById('email');
let month;
let year;

IMask(
  card,
  {
    mask: /^[0-9]\d{0,16}$/,
    mask: '0000 0000 0000 0000',
  });

IMask(
  code,
  {
    mask: /^[0-9]\d{0,3}$/,
    mask: '000',
  });

let momentFormat = 'MM/YY';

IMask(
  data,
  {
    mask: Date,
    pattern: momentFormat,
    lazy: false,
    min: new Date,
    // max: new Date(2030, 0),

    format: function (date) {
      return moment(date).format(momentFormat);
    },
    parse: function (str) {
      return moment(str, momentFormat);
    },

    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 99,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      }
    }
  });

IMask(
  email,
  {
    mask: /^[a-z0-9A-Z]\S*@?\S*$/,
  });


formInput.forEach((input) => {
  const pay = document.querySelectorAll('.logo-pay');
  let logoMir = document.getElementById('mir');
  let logoVisa = document.getElementById('visa');
  let logoMaster = document.getElementById('master');

  input.addEventListener('input', function () {
    if (card) {
      pay.forEach(e => {
        if (card.value == 2) {
          e.classList.remove('show-up');
          logoMir.classList.add('show-up');
        } else if (card.value == 4) {
          e.classList.remove('show-up');
          logoVisa.classList.add('show-up');
        } else if (card.value == 5) {
          e.classList.remove('show-up');
          logoMaster.classList.add('show-up');
        } else if (card.value == '') {
          e.classList.remove('show-up');
        }
      });
    };

    if (card.value.length == 19 && (month && year) && code.value.length == 3 && email.value.match(emaillExpression)) {
      btnPay.removeAttribute('disabled')
    } else {
      btnPay.setAttribute('disabled', 'disabled')
    }
  });

  input.addEventListener('blur', e => {
    if (e.target.value == '') {
      input.classList.remove('form-error');
    } else {
      if (e.target.id == 'card') {
        if (e.target.value.length < 19) {
          input.classList.add('form-error');
        } else {
          input.classList.remove('form-error');
        }
      } else if (e.target.id == 'data') {
        let d = String(e.target.value);
        month = Number(`${d[0]}${d[1]}`);
        year = Number(`${d[3]}${d[4]}`);
        if (!month || !year) {
          input.classList.add('form-error');
        } else {
          input.classList.remove('form-error');
        }
      } else if (e.target.id == 'code') {
        if (e.target.value.length < 3) {
          input.classList.add('form-error');
        } else {
          input.classList.remove('form-error');
        }
      } else if (e.target.id == 'email') {
        if (!e.target.value.match(emaillExpression)) {
          input.classList.add('form-error');
        } else {
          input.classList.remove('form-error');
        }
      }
    }
  })
});