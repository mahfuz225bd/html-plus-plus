// Function to execute a single task or an array of tasks
const performTasks = (T) => {
  // If a single function is passed, wrap it in an array
  if (T instanceof Array) {
    // Execute tasks sequentially
    const executeTask = (index) => {
      if (index >= T.length) {
        return; // Exit if all tasks have been executed
      }

      // Execute the current task
      T[index](() => {
        executeTask(index + 1); // Call the next task
      });
    };

    executeTask(0); // Start executing tasks from the first one
  }
};

// Defining function to fetch data from a URL
const fetchJSON = (url, cb) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch from ${url} with status: ${res.status}`
        );
      }
      return res.json();
    })
    .then((D) => {
      if (typeof cb === "function") {
        cb(D); // Pass the fetched data to the callback
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Definition functions for fetching data using
const f1 = (cb) =>
  fetchJSON("https://jsonplaceholder.typicode.com/posts/1", cb);
const f2 = (cb) =>
  fetchJSON("https://jsonplaceholder.typicode.com/posts/2", cb);
const f3 = (cb) =>
  fetchJSON("https://jsonplaceholder.typicode.com/posts/3", cb);

// fetch All as array
const fAll = [
  f1((output) => {
    console.log(output);
  }),
  f2((result) => {
    console.log(result);
  }),
  f3((result) => {
    console.log(result);
  }),
];

performTasks(...fAll);
