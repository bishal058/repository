document.getElementById('frm').addEventListener('submit', e => {
  e.preventDefault();
  const required = [...document.querySelectorAll('#frm [required]')];
  let valid = true;
  required.forEach(el => {
    const ok = el.checkValidity();
    const err = el.parentElement.querySelector('.err');
    if (!ok) {
      valid = false;
      err.style.display = 'block';
    } else {
      err.style.display = 'none';
    }
  });
  if (!valid) return;

  const data = {
    name: frm.name.value.trim(),
    title: frm.title.value.trim(),
    email: frm.email.value.trim(),
    phone: frm.phone.value.trim(),
    summary: frm.summary.value.trim(),
    skills: frm.skills.value.split(',')
                  .map(s => s.trim()).filter(s => s),
    education: {
      inst: frm.eduInst.value.trim(),
      year: frm.eduYear.value.trim()
    },
    experience: {
      company: frm.expCompany.value.trim(),
      role: frm.expRole.value.trim(),
      desc: frm.expDesc.value.trim()
    }
  };

  const html = `
    <div>
      <h1>${escape(data.name)}</h1>
      <p><em>${escape(data.title)}</em></p>
      <p>${escape(data.email)} · ${escape(data.phone)}</p>
      ${data.summary ? `<p>${escape(data.summary)}</p>` : ''}
      ${data.skills.length ? `<p><strong>Skills:</strong> ${data.skills.map(escape).join(', ')}</p>` : ''}
    </div>
    <div>
      <h2>Education</h2>
      <p>${escape(data.education.inst)} (${escape(data.education.year)})</p>
      <h2>Experience</h2>
      <p><strong>${escape(data.experience.role)}</strong> at ${escape(data.experience.company)}</p>
      <p>${escape(data.experience.desc)}</p>
    </div>`;

  document.getElementById('resContent').innerHTML = html;
  document.getElementById('frm').style.display = 'none';
  document.getElementById('res').style.display = '';
});

document.getElementById('back').onclick = () => {
  document.getElementById('res').style.display = 'none';
  document.getElementById('frm').style.display = '';
};

function escape(txt) {
  const d = document.createElement('div');
  d.innerText = txt;
  return d.innerHTML;
}
