export const isSimilar = (s1: string, s2: string) => {
  return (
    s1.toLocaleLowerCase().includes(s2.toLocaleLowerCase()) ||
    s2.toLocaleLowerCase().includes(s1.toLocaleLowerCase())
  );
};
