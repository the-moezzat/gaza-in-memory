import React from "react";

export default function Page({ params }: { params: { martyrId: string } }) {
  return <div>Martyr {params.martyrId}</div>;
}
