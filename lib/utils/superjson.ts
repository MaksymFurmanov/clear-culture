import superjson from "superjson";

export function serialize<T>(data: T | null) {
  return superjson.stringify(data);
}

export function deserialize<T>(data: string): T {
  return superjson.parse<T>(data);
}