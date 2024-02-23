const form = document.querySelector("#mailForm");
const user = document.querySelector("#email");
const pass = document.querySelector("#password");
const to = document.querySelector("#to");
const subject = document.querySelector("#subject");
const text = document.querySelector("#text");
const valid = document.querySelector("#valid");
const invalid = document.querySelector("#invalid");
const loading = document.querySelector("#loading");
const file = document.querySelector("#file");
const service = document.querySelector("#service");

let content = null;

file.addEventListener("change", (e) => {
  readText(e).then((res) => (content = res));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>';

  const mail = {
    user: user.value,
    pass: pass.value,
    to: to.value,
    subject: subject.value,
    text: text.value,
    filename: file?.files[0]?.name,
    content: file?.files[0] ? content : null,
    service: service.value,
  };

  sendEmail(mail);
});

async function readText(event) {
  const file = event.target.files.item(0);
  return await file.text();
}

async function sendEmail(mail) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mail),
  };
  try {
    const response = await fetch("http://localhost:3000/sendEmail", options);

    if (!response.ok) {
      const result = await response.json();
      valid.textContent = "";
      invalid.textContent = result.message;
      loading.innerHTML = "";
      return;
    }
    const result = await response.json();
    invalid.textContent = "";
    valid.textContent = "Email sent: " + result.message;
    loading.innerHTML = "";
  } catch (e) {
    valid.textContent = "";
    invalid.textContent = e.message;
    loading.innerHTML = "";
    return;
  }
}
