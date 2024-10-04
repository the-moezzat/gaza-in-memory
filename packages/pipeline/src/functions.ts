// src/pipeline.ts

type AsyncFunction = (...args: any[]) => Promise<any>;

class AsyncPipeline {
  private functions: AsyncFunction[] = [];

  add(fn: AsyncFunction): this {
    this.functions.push(fn);
    return this;
  }

  async execute(initialValue?: any): Promise<any> {
    let result = initialValue;
    for (const fn of this.functions) {
      result = await fn(result);
    }
    return result;
  }
}

export default AsyncPipeline;
