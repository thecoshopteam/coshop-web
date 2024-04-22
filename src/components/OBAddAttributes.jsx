import SellIcon from "@mui/icons-material/Sell";

export default function OBAddAttributes() {
  return (
    <div className="flex flex-col items-center gap-2">
      <SellIcon color="primary" sx={{ fontSize: 80 }} />
      <h1 className="text-brand w-64 text-balance text-center text-3xl font-bold">
        Add helpful attributes to list items!
      </h1>
      <p className="w-56 text-balance text-center">
        So that you know exactly what to get
      </p>
    </div>
  );
}
