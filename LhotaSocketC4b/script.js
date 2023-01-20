const socketFce = () => {
  const socket = new WebSocket("ws://ws.ifelse.io:80");
  const message = document.getElementById("zprava").value;
  document.getElementById("zprava").value = "";

  socket.onopen = (event) => {
    console.log(`senduju message: ${message}`);
    socket.send(message);
  };

  let data = "";
  socket.onmessage = (event) => {
    console.log(`prichozi message: ${event.data}`);
    data = event.data;
    displayData(data);
  };

  const displayData = (data) => {
	  
    const dataArray = data.split("\n");
    let p = "";
    for (let i = 0; i < dataArray.length; i++) {
      p = document.createElement("p");
      p.innerHTML = dataArray[i];
    }
	
    document.getElementById("chat").innerHTML = data;
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log("Connection closed");
    } else {
      alert("[close] pripojeni spadlo (No server)");
    }
  };

  socket.onerror = (error) => {
    alert("[error]");
  };
};
