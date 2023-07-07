export const useRouter = () => {
  const push = (path: string): void => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const pop = (): void => {
    window.history.back();
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return { push, pop };
};
