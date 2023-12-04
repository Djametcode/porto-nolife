export default function UserDetailComponent({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div>
      <h1>Hello {params.userId}</h1>
    </div>
  );
}
