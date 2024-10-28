"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

type LocaleLinkWrapperProps = React.ComponentProps<typeof Link>;

export default function LocaleLinkWrapper({
  href,
  ...props
}: LocaleLinkWrapperProps) {
  const { locale } = useParams();
  return (
    <Link href={`/${locale}${href}`} {...props}>
      {props.children}
    </Link>
  );
}
