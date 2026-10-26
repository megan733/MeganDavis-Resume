'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const closeMenu = () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const dataset = [
  { key: 'google', spend: 2400, leads: 60, matches: 30 },
  { key: 'meta', spend: 1800, leads: 120, matches: 18 }
];
const insights = {
  leads: '<strong>Meta has the lower cost per lead.</strong> Before moving budget, I’d check which leads also appear in the client’s CRM. Switch to “CRM matches” to see why.',
  matches: '<strong>Google has the lower cost per CRM match.</strong> The cheaper form submissions didn’t produce the cheaper matched records in this example. A match confirms CRM presence—not a closed sale.'
};
document.querySelectorAll('[data-metric]').forEach(button => {
  button.addEventListener('click', () => {
    const metric = button.dataset.metric;
    const costs = dataset.map(channel => channel.spend / channel[metric]);
    const maximum = Math.max(...costs);
    const minimum = Math.min(...costs);
    dataset.forEach((channel, index) => {
      document.querySelector(`#${channel.key}-value`).textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(costs[index]);
      document.querySelector(`#${channel.key}-bar`).style.width = `${costs[index] / maximum * 100}%`;
      document.querySelector(`#${channel.key}-best`).hidden = costs[index] !== minimum;
    });
    document.querySelectorAll('[data-metric-unit]').forEach(label => { label.textContent = metric === 'leads' ? 'lead' : 'CRM match'; });
    document.querySelector('#metric-insight').innerHTML = insights[metric];
    document.querySelectorAll('[data-metric]').forEach(control => {
      const active = control === button;
      control.classList.toggle('active', active);
      control.setAttribute('aria-pressed', String(active));
    });
  });
});

const projects = {
  commerce: {
    category: 'E-commerce / Shopify / Franchise operations',
    title: 'A storefront built for franchisees.',
    context: 'Amazing Athletes · E-commerce Manager · June 2016 – March 2020',
    content: '<h3>The brief</h3><p>Give franchisees an online place to purchase the business materials they needed, while organizing the operations behind the store.</p><h3>My contribution</h3><ul><li>Built and launched the Shopify “Play Store” for franchisees.</li><li>Managed products, inventory, and vendor relationships.</li><li>Established inventory management and fulfillment systems.</li><li>Connected day-to-day store operations with the needs of franchisees.</li></ul><h3>What this work shows</h3><p>Hands-on experience taking an e-commerce platform from concept to daily operation, with ownership across the storefront and the processes supporting it.</p>'
  },
  recruitment: {
    category: 'Paid media / Recruitment marketing / Budget strategy',
    title: 'Recruitment with a full-funnel view.',
    context: 'Conversion Interactive Agency · Digital Strategist · March 2023 – July 2025',
    content: '<h3>The focus</h3><p>Develop and execute digital advertising strategies supporting CDL truck driver recruitment.</p><h3>My contribution</h3><ul><li>Planned monthly advertising budget allocations around hiring goals.</li><li>Worked with job boards, including Talent and Indeed, to improve job-posting visibility.</li><li>Applied SEO practices to recruitment content.</li><li>Used Google Ads to support brand awareness and lead acquisition.</li></ul><h3>What this work shows</h3><p>Experience connecting audience intent, channel selection, budget decisions, and lead generation within a specialized recruitment funnel.</p>'
  },
  search: {
    category: 'PPC / SEO / Website content / Agency strategy',
    title: 'Helping businesses get found.',
    context: 'Muletown Digital · Digital Marketing Director · July 2025 – 2026',
    content: '<h3>The focus</h3><p>Lead digital strategy across a varied client portfolio, with paid media, search visibility, and website content supporting the same business goals.</p><h3>My contribution</h3><ul><li>Led PPC and SEO planning across client accounts.</li><li>Managed Google and Meta campaign setup, launches, and optimization.</li><li>Developed budget recommendations, pacing, and performance forecasts.</li><li>Directed website SEO foundations, including structure, metadata, technical considerations, and local SEO.</li><li>Created website copy, blog content, and Google Business Profile posts.</li><li>Translated performance trends into client reporting and next-step recommendations.</li></ul><h3>What this work shows</h3><p>Experience balancing strategic oversight with execution, and communicating performance in terms that help clients make decisions.</p>'
  }
};
const dialog = document.querySelector('#project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    lastProjectButton = button;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-context').textContent = project.context;
    document.querySelector('#dialog-content').innerHTML = project.content;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  });
});
document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastProjectButton?.focus({ preventScroll: true });
});

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  const button = document.querySelector('#copy-email');
  try {
    await navigator.clipboard.writeText('meganannb8@gmail.com');
    button.textContent = 'Email copied ✓';
    status.textContent = 'Email address copied to clipboard.';
    window.setTimeout(() => { button.innerHTML = 'Copy email <span aria-hidden="true">⧉</span>'; }, 2500);
  } catch {
    status.textContent = 'Copy unavailable. Use the email link or copy meganannb8@gmail.com.';
    button.textContent = 'meganannb8@gmail.com';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
