// Performance test for multiple task execution techniques
const tasks = Array.from({ length: 100 }, (_, i) => {
  return function (done) {
    setTimeout(() => {
      console.log(`Task ${i + 1} executed`);
      done();
    }, 50);
  };
});

// Performance measurement
const performanceResults = [];

// Technique 1: Recursion with Callbacks
const testRecursion = () => {
  const startTime = performance.now();
  const execute = (index) => {
    if (index < tasks.length) {
      tasks[index](function () {
        execute(index + 1);
      });
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Recursion with Callbacks",
        Time: endTime - startTime,
      });
    }
  };
  execute(0);
};

// Technique 2: Loop with Callbacks
const testLoopWithCallbacks = () => {
  const startTime = performance.now();
  const go = () => {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i](function () {
        if (i === tasks.length - 1) {
          const endTime = performance.now();
          performanceResults.push({
            Technique: "Loop with Callbacks",
            Time: endTime - startTime,
          });
        }
      });
    }
  };
  go();
};

// Technique 3: Single Task Execution
const testSingleTaskExecution = () => {
  const startTime = performance.now();
  let i = 0;

  const go = () => {
    if (i < tasks.length) {
      tasks[i++](go);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Single Task Execution",
        Time: endTime - startTime,
      });
    }
  };
  go();
};

// Technique 4: Chained Callbacks
const testChainedCallbacks = () => {
  const startTime = performance.now();
  const executeTask = (index) => {
    if (index < tasks.length) {
      tasks[index](function () {
        executeTask(index + 1);
      });
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Chained Callbacks",
        Time: endTime - startTime,
      });
    }
  };
  executeTask(0);
};

// Technique 5: Task Queue
const testTaskQueue = () => {
  const startTime = performance.now();
  const queue = tasks.slice(); // Copy tasks
  const executeNext = () => {
    if (queue.length > 0) {
      const task = queue.shift();
      task(executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Task Queue",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Technique 6: Callback Stacking with `apply()`
const testCallbackStackingApply = () => {
  const startTime = performance.now();
  const executeTask = (index) => {
    if (index < tasks.length) {
      tasks[index].apply(null, [
        function () {
          executeTask(index + 1);
        },
      ]);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Callback Stacking with apply()",
        Time: endTime - startTime,
      });
    }
  };
  executeTask(0);
};

// Technique 7: Using a Simple Counter with a Loop
const testSimpleCounterLoop = () => {
  const startTime = performance.now();
  let i = 0;
  const go = () => {
    if (i < tasks.length) {
      tasks[i++](go);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Simple Counter with a Loop",
        Time: endTime - startTime,
      });
    }
  };
  go();
};

// Technique 8: Using a Self-Invoking Function
const testSelfInvokingFunction = () => {
  const startTime = performance.now();
  (function execute(index = 0) {
    if (index < tasks.length) {
      tasks[index](function () {
        execute(index + 1);
      });
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Self-Invoking Function",
        Time: endTime - startTime,
      });
    }
  })();
};

// Technique 9: Using Array.prototype.reduce()
const testArrayReduce = () => {
  const startTime = performance.now();
  tasks
    .reduce((promise, task) => {
      return promise.then(() => {
        return new Promise((resolve) => {
          task(resolve);
        });
      });
    }, Promise.resolve())
    .then(() => {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using Array.prototype.reduce()",
        Time: endTime - startTime,
      });
    });
};

// Technique 10: Using forEach with Closure
const testForEachClosure = () => {
  const startTime = performance.now();
  tasks.forEach((task, index) => {
    task(function () {
      if (index === tasks.length - 1) {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using forEach with Closure",
          Time: endTime - startTime,
        });
      }
    });
  });
};

// Technique 11: Using a Generator Function with a Polyfill
const testGeneratorPolyfill = () => {
  const startTime = performance.now();
  const generator = function* () {
    for (let i = 0; i < tasks.length; i++) {
      yield tasks[i];
    }
  };

  const execGen = generator();
  const executeNext = () => {
    const next = execGen.next();
    if (!next.done) {
      next.value(executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Generator Function with a Polyfill",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Technique 12: Using Closure with Indexed Variable
const testClosureIndexedVariable = () => {
  const startTime = performance.now();
  const executeWithClosure = (index) => {
    if (index < tasks.length) {
      tasks[index](function () {
        executeWithClosure(index + 1);
      });
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using Closure with Indexed Variable",
        Time: endTime - startTime,
      });
    }
  };
  executeWithClosure(0);
};

// Technique 13: Using Array.prototype.map() with Side Effects
const testArrayMapSideEffects = () => {
  const startTime = performance.now();
  tasks.map((task, index) => {
    task(function () {
      if (index === tasks.length - 1) {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using Array.prototype.map() with Side Effects",
          Time: endTime - startTime,
        });
      }
    });
  });
};

// Technique 14: Manual Stack Management
const testManualStackManagement = () => {
  const startTime = performance.now();
  const stack = tasks.slice(); // Copy of tasks
  const executeNext = () => {
    if (stack.length > 0) {
      const task = stack.pop();
      task(executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Manual Stack Management",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Technique 15: Using an Object as a State Holder
const testObjectAsStateHolder = () => {
  const startTime = performance.now();
  const state = { index: 0 };
  const executeNext = () => {
    if (state.index < tasks.length) {
      tasks[state.index++](executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using an Object as a State Holder",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Technique 16: Using while Loop with Function Callbacks
const testWhileLoopCallbacks = () => {
  const startTime = performance.now();
  let i = 0;
  const go = () => {
    while (i < tasks.length) {
      tasks[i++](go);
    }
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Using while Loop with Function Callbacks",
      Time: endTime - startTime,
    });
  };
  go();
};

// Technique 17: Function Composition
const testFunctionComposition = () => {
  const startTime = performance.now();
  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((acc, fn) => fn(acc), x);

  const execute = compose(...tasks);
  execute(function () {
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Function Composition",
      Time: endTime - startTime,
    });
  });
};

// Technique 18: Event Emitter Pattern
const testEventEmitter = () => {
  const startTime = performance.now();
  const events = {};
  const on = (event, listener) => {
    events[event] = events[event] || [];
    events[event].push(listener);
  };
  const emit = (event) => {
    if (events[event]) {
      events[event].forEach((listener) => listener());
    }
  };

  tasks.forEach((task, index) => {
    on("taskComplete", () => {
      if (index === tasks.length - 1) {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Event Emitter Pattern",
          Time: endTime - startTime,
        });
      }
    });
    task(() => emit("taskComplete"));
  });
};

// Technique 19: Promises with a Polyfill
const testPromisesPolyfill = () => {
  const startTime = performance.now();
  let promise = Promise.resolve();

  tasks.forEach((task) => {
    promise = promise.then(() => {
      return new Promise((resolve) => {
        task(resolve);
      });
    });
  });

  promise.then(() => {
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Promises with a Polyfill",
      Time: endTime - startTime,
    });
  });
};

// Technique 20: Using a Helper Function for Task Execution
const testHelperFunction = () => {
  const startTime = performance.now();
  const executeTask = (taskIndex) => {
    if (taskIndex < tasks.length) {
      tasks[taskIndex](function () {
        executeTask(taskIndex + 1);
      });
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Helper Function for Task Execution",
        Time: endTime - startTime,
      });
    }
  };
  executeTask(0);
};

// Technique 21: Using a Task Chain Object
const testTaskChainObject = () => {
  const startTime = performance.now();
  const taskChain = {
    index: 0,
    execute: function () {
      if (this.index < tasks.length) {
        tasks[this.index++](this.execute.bind(this));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Task Chain Object",
          Time: endTime - startTime,
        });
      }
    },
  };
  taskChain.execute();
};

// Technique 22: Stateful Task Execution
const testStatefulExecution = () => {
  const startTime = performance.now();
  let index = 0;

  const executeNext = () => {
    if (index < tasks.length) {
      tasks[index++](executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Stateful Task Execution",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Technique 23: Using apply() for Dynamic Execution
const testDynamicExecutionApply = () => {
  const startTime = performance.now();
  const execute = (index) => {
    if (index < tasks.length) {
      tasks[index].apply(null, [execute.bind(null, index + 1)]);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using apply() for Dynamic Execution",
        Time: endTime - startTime,
      });
    }
  };
  execute(0);
};

// Technique 24: Event-Driven Execution
const testEventDrivenExecution = () => {
  const startTime = performance.now();
  const events = {};
  const on = (event, listener) => {
    events[event] = events[event] || [];
    events[event].push(listener);
  };
  const emit = (event) => {
    if (events[event]) {
      events[event].forEach((listener) => listener());
    }
  };

  tasks.forEach((task, index) => {
    task(() => {
      emit("taskComplete");
      if (index === tasks.length - 1) {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Event-Driven Execution",
          Time: endTime - startTime,
        });
      }
    });
  });
};

// Technique 25: Condition-based Execution
const testConditionBasedExecution = () => {
  const startTime = performance.now();
  let i = 0;

  const go = () => {
    if (i < tasks.length) {
      tasks[i++](go);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Condition-based Execution",
        Time: endTime - startTime,
      });
    }
  };
  go();
};

// Technique 26: Simple Task Tracker
const testSimpleTaskTracker = () => {
  const startTime = performance.now();
  const tracker = { count: 0 };

  const executeNext = () => {
    if (tracker.count < tasks.length) {
      tasks[tracker.count++](executeNext);
    } else {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Simple Task Tracker",
        Time: endTime - startTime,
      });
    }
  };
  executeNext();
};

// Additional Techniques (27-60)
const testTechniques = [
  // Technique 27: Using a Map to Keep Track of Tasks
  () => {
    const startTime = performance.now();
    const taskMap = new Map(tasks.map((task, index) => [index, task]));

    const executeNext = (index) => {
      if (taskMap.has(index)) {
        taskMap.get(index)(() => executeNext(index + 1));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Map to Keep Track of Tasks",
          Time: endTime - startTime,
        });
      }
    };
    executeNext(0);
  },

  // Technique 28: Using a Set to Track Completed Tasks
  () => {
    const startTime = performance.now();
    const completedTasks = new Set();

    const executeNext = (index) => {
      if (index < tasks.length) {
        tasks[index](() => {
          completedTasks.add(index);
          executeNext(index + 1);
        });
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Set to Track Completed Tasks",
          Time: endTime - startTime,
        });
      }
    };
    executeNext(0);
  },

  // Technique 29: Chaining Promises
  () => {
    const startTime = performance.now();
    let promise = Promise.resolve();

    tasks.forEach((task) => {
      promise = promise.then(() => new Promise((resolve) => task(resolve)));
    });

    promise.then(() => {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Chaining Promises",
        Time: endTime - startTime,
      });
    });
  },

  // Technique 30: Using Async/Await (ES8)
  async () => {
    const startTime = performance.now();
    const executeTasks = async () => {
      for (const task of tasks) {
        await new Promise((resolve) => task(resolve));
      }
    };

    await executeTasks();
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Using Async/Await",
      Time: endTime - startTime,
    });
  },

  // Technique 31: Using reduce with a Promise
  () => {
    const startTime = performance.now();
    tasks
      .reduce(
        (promise, task) =>
          promise.then(() => new Promise((resolve) => task(resolve))),
        Promise.resolve()
      )
      .then(() => {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using reduce with a Promise",
          Time: endTime - startTime,
        });
      });
  },

  // Technique 32: Using a Stack Data Structure
  () => {
    const startTime = performance.now();
    const stack = [...tasks];

    const executeNext = () => {
      if (stack.length) {
        const task = stack.pop();
        task(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Stack Data Structure",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 33: Using a Queue Data Structure
  () => {
    const startTime = performance.now();
    const queue = [...tasks];

    const executeNext = () => {
      if (queue.length) {
        const task = queue.shift();
        task(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Queue Data Structure",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 34: Using the `this` Context
  () => {
    const startTime = performance.now();
    const context = { index: 0 };

    const executeNext = function () {
      if (this.index < tasks.length) {
        tasks[this.index++](executeNext.bind(this));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using the `this` Context",
          Time: endTime - startTime,
        });
      }
    };
    executeNext.call(context);
  },

  // Technique 35: Using an Array as a Stack
  () => {
    const startTime = performance.now();
    const stack = tasks.slice();

    const executeNext = () => {
      if (stack.length) {
        const task = stack.pop();
        task(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using an Array as a Stack",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 36: Using an Array as a Queue
  () => {
    const startTime = performance.now();
    const queue = tasks.slice();

    const executeNext = () => {
      if (queue.length) {
        const task = queue.shift();
        task(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using an Array as a Queue",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 37: Using Object-Oriented Principles
  () => {
    const startTime = performance.now();
    function TaskExecutor(tasks) {
      this.tasks = tasks;
      this.index = 0;
    }

    TaskExecutor.prototype.executeNext = function () {
      if (this.index < this.tasks.length) {
        this.tasks[this.index++](this.executeNext.bind(this));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using Object-Oriented Principles",
          Time: endTime - startTime,
        });
      }
    };

    const executor = new TaskExecutor(tasks);
    executor.executeNext();
  },

  // Technique 38: Using a Counter Object
  () => {
    const startTime = performance.now();
    const counter = { index: 0 };

    const executeNext = () => {
      if (counter.index < tasks.length) {
        tasks[counter.index++](executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Counter Object",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 39: Using a Promise-based Task Runner
  () => {
    const startTime = performance.now();

    const runTasks = (tasks) => {
      return tasks.reduce((promise, task) => {
        return promise.then(() => new Promise((resolve) => task(resolve)));
      }, Promise.resolve());
    };

    runTasks(tasks).then(() => {
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Promise-based Task Runner",
        Time: endTime - startTime,
      });
    });
  },

  // Technique 40: Using a Task Tracker Object
  () => {
    const startTime = performance.now();
    const tracker = { index: 0 };

    const executeNext = () => {
      if (tracker.index < tasks.length) {
        tasks[tracker.index++](executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Task Tracker Object",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 41: Using a Simple Event Loop Simulation
  () => {
    const startTime = performance.now();
    const queue = [...tasks];

    const eventLoop = () => {
      if (queue.length) {
        const task = queue.shift();
        task(eventLoop);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Simple Event Loop Simulation",
          Time: endTime - startTime,
        });
      }
    };
    eventLoop();
  },

  // Technique 42: Using a Simple Promise Polyfill
  () => {
    const startTime = performance.now();
    const MyPromise = function (executor) {
      this.callbacks = [];
      const resolve = () => {
        this.callbacks.forEach((callback) => callback());
      };
      executor(resolve);
    };

    const executeTasks = () => {
      let promise = new MyPromise((resolve) => {
        tasks.forEach((task, index) => {
          task(() => {
            if (index === tasks.length - 1) resolve();
          });
        });
      });

      promise.callbacks.push(() => {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Simple Promise Polyfill",
          Time: endTime - startTime,
        });
      });
    };
    executeTasks();
  },

  // Technique 43: Using a Closure for Task Chaining
  () => {
    const startTime = performance.now();

    const executeTasks = (index = 0) => {
      if (index < tasks.length) {
        tasks[index](() => executeTasks(index + 1));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Closure for Task Chaining",
          Time: endTime - startTime,
        });
      }
    };
    executeTasks();
  },

  // Technique 44: Using a Custom Iterator
  () => {
    const startTime = performance.now();

    const taskIterator = (tasks) => {
      let index = 0;

      return {
        next: () => {
          if (index < tasks.length) {
            return { value: tasks[index++], done: false };
          }
          return { done: true };
        },
      };
    };

    const iterator = taskIterator(tasks);
    const executeNext = () => {
      const { value, done } = iterator.next();
      if (!done) {
        value(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Custom Iterator",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 45: Using a State Machine Pattern
  () => {
    const startTime = performance.now();
    const stateMachine = {
      index: 0,
      run: function () {
        if (this.index < tasks.length) {
          tasks[this.index++](this.run.bind(this));
        } else {
          const endTime = performance.now();
          performanceResults.push({
            Technique: "Using a State Machine Pattern",
            Time: endTime - startTime,
          });
        }
      },
    };
    stateMachine.run();
  },

  // Technique 46: Using a Context Object to Store State
  () => {
    const startTime = performance.now();
    const context = { index: 0 };

    const executeNext = () => {
      if (context.index < tasks.length) {
        tasks[context.index++](executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Context Object to Store State",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 47: Using a Data Structure to Manage State
  () => {
    const startTime = performance.now();
    const state = { currentTask: 0 };

    const executeNext = () => {
      if (state.currentTask < tasks.length) {
        tasks[state.currentTask++](executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Data Structure to Manage State",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 48: Using a Task Object to Encapsulate Behavior
  () => {
    const startTime = performance.now();
    const Task = function (func) {
      this.func = func;
    };

    const tasksWithEncapsulation = tasks.map((task) => new Task(task));
    const executeNext = (index = 0) => {
      if (index < tasksWithEncapsulation.length) {
        tasksWithEncapsulation[index].func(executeNext.bind(null, index + 1));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Task Object to Encapsulate Behavior",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 49: Using a Factory Function to Create Tasks
  () => {
    const startTime = performance.now();
    const taskFactory = (func) => {
      return function (done) {
        func(done);
      };
    };

    const tasksWithFactory = tasks.map((task) => taskFactory(task));
    const executeNext = (index = 0) => {
      if (index < tasksWithFactory.length) {
        tasksWithFactory[index](executeNext.bind(null, index + 1));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Factory Function to Create Tasks",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 50: Using a Task Executor with Error Handling
  () => {
    const startTime = performance.now();
    const executeNext = (index = 0) => {
      if (index < tasks.length) {
        tasks[index]((err) => {
          if (err) {
            console.error("Task failed:", err);
          } else {
            executeNext(index + 1);
          }
        });
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Task Executor with Error Handling",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 51: Using an Async Queue Implementation
  () => {
    const startTime = performance.now();
    const asyncQueue = (tasks) => {
      const executeNext = (index) => {
        if (index < tasks.length) {
          tasks[index](executeNext.bind(null, index + 1));
        }
      };
      executeNext(0);
    };

    asyncQueue(tasks);
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Using an Async Queue Implementation",
      Time: endTime - startTime,
    });
  },

  // Technique 52: Using an Event-Driven Approach
  () => {
    const startTime = performance.now();
    const eventEmitter = {
      events: {},
      on: function (event, listener) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(listener);
      },
      emit: function (event) {
        if (this.events[event]) {
          this.events[event].forEach((listener) => listener());
        }
      },
    };

    let completedTasks = 0;

    tasks.forEach((task, index) => {
      eventEmitter.on("taskComplete", () => {
        completedTasks++;
        if (completedTasks === tasks.length) {
          const endTime = performance.now();
          performanceResults.push({
            Technique: "Using an Event-Driven Approach",
            Time: endTime - startTime,
          });
        }
      });
      task(() => eventEmitter.emit("taskComplete"));
    });
  },

  // Technique 53: Using a Task Queue with Callback Tracking
  () => {
    const startTime = performance.now();
    const taskQueue = (tasks) => {
      let index = 0;
      const executeNext = () => {
        if (index < tasks.length) {
          tasks[index](() => {
            index++;
            executeNext();
          });
        }
      };
      executeNext();
    };

    taskQueue(tasks);
    const endTime = performance.now();
    performanceResults.push({
      Technique: "Using a Task Queue with Callback Tracking",
      Time: endTime - startTime,
    });
  },

  // Technique 54: Using a Task Scheduler
  () => {
    const startTime = performance.now();
    const scheduler = {
      queue: [],
      add: function (task) {
        this.queue.push(task);
      },
      run: function () {
        const executeNext = () => {
          if (this.queue.length) {
            const task = this.queue.shift();
            task(executeNext);
          } else {
            const endTime = performance.now();
            performanceResults.push({
              Technique: "Using a Task Scheduler",
              Time: endTime - startTime,
            });
          }
        };
        executeNext();
      },
    };

    tasks.forEach((task) => scheduler.add(task));
    scheduler.run();
  },

  // Technique 55: Using an Execution Context
  () => {
    const startTime = performance.now();
    const executionContext = {
      index: 0,
      run: function () {
        if (this.index < tasks.length) {
          tasks[this.index++](this.run.bind(this));
        } else {
          const endTime = performance.now();
          performanceResults.push({
            Technique: "Using an Execution Context",
            Time: endTime - startTime,
          });
        }
      },
    };
    executionContext.run();
  },

  // Technique 56: Using an Execution Stack
  () => {
    const startTime = performance.now();
    const stack = [...tasks];

    const executeNext = () => {
      if (stack.length) {
        const task = stack.pop();
        task(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using an Execution Stack",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 57: Using a Task Context
  () => {
    const startTime = performance.now();
    const context = { index: 0 };

    const executeNext = () => {
      if (context.index < tasks.length) {
        tasks[context.index++](executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Task Context",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 58: Using a Function Wrapper for Task Execution
  () => {
    const startTime = performance.now();
    const wrapper = (func) => (done) => func(done);

    const tasksWithWrapper = tasks.map(wrapper);
    const executeNext = (index = 0) => {
      if (index < tasksWithWrapper.length) {
        tasksWithWrapper[index](executeNext.bind(null, index + 1));
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Function Wrapper for Task Execution",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },

  // Technique 59: Using a Deferred Execution Pattern
  () => {
    const startTime = performance.now();
    const deferredExecution = (task) => {
      return new Promise((resolve) => task(resolve));
    };

    const executeTasks = async () => {
      for (const task of tasks) {
        await deferredExecution(task);
      }
      const endTime = performance.now();
      performanceResults.push({
        Technique: "Using a Deferred Execution Pattern",
        Time: endTime - startTime,
      });
    };
    executeTasks();
  },

  // Technique 60: Using a Priority Queue for Task Execution
  () => {
    const startTime = performance.now();
    const priorityQueue = [];
    let index = 0;

    const executeNext = () => {
      if (index < tasks.length) {
        priorityQueue.push(tasks[index++]);
        priorityQueue.shift()(executeNext);
      } else {
        const endTime = performance.now();
        performanceResults.push({
          Technique: "Using a Priority Queue for Task Execution",
          Time: endTime - startTime,
        });
      }
    };
    executeNext();
  },
];

// Execute all techniques
const executeAllTechniques = async () => {
  // Run all test techniques in sequence
  for (const technique of testTechniques) {
    technique();
    await new Promise((resolve) => setTimeout(resolve, 50)); // Adding a delay between techniques to avoid overlaps
  }

  // Log the final performance results in a table format
  console.table(performanceResults);
};

// Start the execution
executeAllTechniques();

// will be the code generate report about 60 techniques (all)
