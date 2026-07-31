const fs = require('fs');

const files = ['index.html', 'vision-mission.html', 'about.html', 'global-presence.html', 'investors.html'];

const oldBlock = `<li class="dropdown">
                    <a href="#">Products +</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Industrial Lubricants</a></li>
                        <li><a href="#">Industrial Oil</a></li>
                        <li><a href="#">Automotive Oil</a></li>
                        <li><a href="#">Base Oil</a></li>
                        <li><a href="#">Greases</a></li>
                        <li><a href="#">Specialties</a></li>
                        <li><a href="#">Additive list</a></li>
                    </ul>
                </li>`;

const newBlock = `<li class="dropdown">
                    <a href="#">Products +</a>
                    <ul class="dropdown-menu">
                        <li><a href="industrial-lubricants.html">Industrial Lubricants</a></li>
                        <li><a href="industrial-oil.html">Industrial Oil</a></li>
                        <li><a href="automotive-oil.html">Automotive Oil</a></li>
                        <li><a href="base-oil.html">Base Oil</a></li>
                        <li><a href="greases.html">Greases</a></li>
                        <li><a href="specialties.html">Specialties</a></li>
                        <li><a href="additive-list.html">Additive list</a></li>
                    </ul>
                </li>`;

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes(oldBlock)) {
        content = content.replace(oldBlock, newBlock);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated links in ' + file);
    }
});
