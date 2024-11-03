import CoreForm from "./core-form";

export default function AddMemory() {
  return (
    <CoreForm
      martyrName=""
      onCancel={() => {}}
      onSubmit={(data) => console.log(data)}
    />
  );
}
