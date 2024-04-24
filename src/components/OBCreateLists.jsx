import ListAltIcon from "@mui/icons-material/ListAlt";

export default function OBCreateLists() {
  return (
    <div className="flex flex-col items-center gap-2">
      <ListAltIcon color="primary" sx={{ fontSize: 80 }} />
      <h1 className="w-64 text-balance text-center text-3xl font-bold text-brand">
        Easily create your shopping lists!
      </h1>
      <p className="w-56 text-balance text-center">
        In a easy-to-use, modern, and aesthetically-pleasing UI
      </p>
    </div>
  );
}
