export const useClickOutside = (ref, ref2, target, setOpen) => {
  if (
    ref?.current &&
    ref2?.current &&
    !ref.current.contains(target) &&
    !ref2.current.contains(target)
  ) {
    setOpen(false);
  }
};
