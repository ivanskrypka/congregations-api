export class Utils {
  static enumKeys<T>(obj: T): string[] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return Object.keys(obj).filter((key) => isNaN(Number(key)));
  }

  static enumKeysCount<T>(obj: T): number {
    return this.enumKeys(obj).length;
  }
}
