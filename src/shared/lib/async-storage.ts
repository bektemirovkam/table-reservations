import AsyncStorage from "@react-native-async-storage/async-storage";

async function load<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

async function remove(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export const asyncStorage = {
  load,
  save,
  remove,
  clear,
};
