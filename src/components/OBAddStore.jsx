import StoreIcon from "@mui/icons-material/Store";

export default function OBAddStore() {
  return (
    <div className="flex flex-col items-center gap-2">
      <StoreIcon color="primary" sx={{ fontSize: 80 }} />
      <h1 className="text-brand w-64 text-balance text-center text-3xl font-bold">
        Specify what store to buy from!
      </h1>
      <p className="w-56 text-balance text-center">
        So that you know exactly where to go
      </p>
    </div>
  );
}
