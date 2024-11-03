import { ImageResponse } from "next/og";
import { createClerkSupabaseClientSsr } from "@/lib/client";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { martyrId: string } },
) {
  const client = createClerkSupabaseClientSsr(false);

  const { data: martyr } = await client
    .from("martyrs")
    .select("*")
    .eq("id", params.martyrId)
    .single();

  if (!martyr) {
    return new Response("Not found", { status: 404 });
  }

  const fullName = `${martyr.first_name} ${martyr.last_name}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        {/* Background with overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000",
            opacity: 0.5,
          }}
        />

        {/* Profile image if available */}
        {martyr.profile_image_url && (
          <img
            src={martyr.profile_image_url}
            alt={fullName}
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              marginBottom: 20,
              objectFit: "cover",
              border: "4px solid white",
            }}
          />
        )}

        {/* Name */}
        <h1
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {fullName}
        </h1>

        {/* Date */}
        <p
          style={{
            fontSize: 32,
            color: "white",
            textAlign: "center",
          }}
        >
          {martyr.date_of_birth?.split("T")[0]} -{" "}
          {martyr.date_of_death?.split("T")[0]}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
