import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onCreatePromisesClick);

function onCreatePromisesClick(event) {
  event.preventDefault();

  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);

  for (let i = 0; i < refs.amountInput.value; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally((delay += step));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
