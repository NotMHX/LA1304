function ping(ip) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const start = Date.now();

    xhr.open("GET", `${ip}/`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const end = Date.now();
        const elapsed = end - start;
        if (elapsed < 2000) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error(`Failed to ping ${ip}`));
    };

    xhr.send();
  });
}

export { ping };
