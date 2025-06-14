export class Utils {
  static enumKeys<T>(obj: T): string[] {
    // @ts-ignore
    return Object.keys(obj).filter((key) => isNaN(Number(key)));
  }
}
