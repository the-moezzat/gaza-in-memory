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

  const fullName =
    `${martyr.first_name} ${martyr.middle_name ?? ""} ${martyr.last_name}`.trim();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "32px",
            borderRadius: "16px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.07)",
          }}
        >
          {/* Left side - Profile Info */}
          <div
            style={{
              flex: "9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Profile Image with Badge */}
            <div
              style={{
                position: "relative",
                width: "300px",
                height: "300px",
              }}
            >
              <img
                src={martyr.profile_image_url!}
                alt={martyr.first_name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              {/* Badge Check Icon */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "64px",
                  height: "64px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
            </div>

            {/* Name and Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  textAlign: "center",
                }}
              >
                {fullName}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#4b5563",
                }}
              >
                🏅 Champion
              </div>
            </div>
          </div>

          {/* Right side - Details */}
          <div
            style={{
              flex: "3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "1px solid #e5e7eb",
              paddingLeft: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <ProfileDataItem
                label="Age"
                value={
                  martyr.date_of_birth
                    ? new Date().getFullYear() -
                      new Date(martyr.date_of_birth).getFullYear()
                    : "N/A"
                }
              />
              <ProfileDataItem label="City" value={martyr.city} />
              <ProfileDataItem
                label="Gender"
                value={martyr.gender === "male" ? "Male" : "Female"}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

function ProfileDataItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1f2937",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "18px",
          color: "#4b5563",
        }}
      >
        {label}
      </span>
    </div>
  );
}
