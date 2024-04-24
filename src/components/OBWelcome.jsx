export default function OBWelcome() {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src="/coshop.svg" alt="logo" className="w-20" />
      <h1 className="text-3xl font-bold text-brand">Welcome to CoShop!</h1>
      <p className="text-xl font-medium">We make shopping simpler.</p>
      <p>Click next to learn what we&apos;re about</p>
    </div>
  );
}
