  let next = () => {
            if(this.tasks.length === index) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        }
        next(