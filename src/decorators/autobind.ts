namespace App {
  export function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalaMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalaMethod.bind(this);
        return boundFn;
      }
    }
    return adjDescriptor
  }
}