const mcstatus = document.getElementById('status');
const players = document.getElementById('players');
const version = document.getElementById('version');
const serverIP = document.getElementById('serverIp');
const playersList = document.getElementById('playersList');
const statusContainer = document.getElementById('statusContainer');
const serverName = document.getElementById('serverName');

class serverApi {
    constructor(serverIP) {
        this.serverIP = serverIP;
    }
    getServerInfo() {
        fetch(`https://api.mcsrvstat.us/3/${this.serverIP}`)
            .then((res) => res.json())
            .then((data) => {
                serverIP.innerText = this.serverIP;
                if (data.online) {
                    mcstatus.textContent = 'online';
                } else {
                    mcstatus.textContent = 'offline';
                }
                if (data.players) {
                    players.innerHTML = `${data.players.online}/${data.players.max}`;
                } else {
                    players.innerHTML = '0/0';
                }
                if (data.version)  {
                    version.innerHTML = data.version;
                } else {
                    version.innerHTML = 'N/A';
                }
                if (data.icon) {
                    statusContainer.style.backgroundImage = `url(${data.icon})`;
                } else {
                    statusContainer.style.backgroundImage = 'url(./src/serverError.avif)';
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

const server1 = new serverApi(serverIP.innerText);
server1.getServerInfo();

const serverInfo = document.getElementsByClassName('serverInfo');
for (let i = 0; i < serverInfo.length; i++) {
    serverInfo[i].addEventListener('click', function() {
            var copyText = serverInfo[i].innerText;
            navigator.clipboard.writeText(copyText);
            copyDiv.hidden = false;
            setTimeout(() => {
                copyDiv.hidden = true;
            }, 2000);
    });
}

const copyDiv = document.getElementById('copyDiv');
copyDiv.hidden = true;

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const serverIpBox = document.getElementById('serverIpBox');
    if (serverIpBox.value.trim() === '') {
        const updateServer = new serverApi("mbs.berrysmp.net");
        updateServer.getServerInfo();
    } else {
        const updateServer = new serverApi(serverIpBox.value);
        updateServer.getServerInfo();
    }
    serverIpBox.value = '';
});