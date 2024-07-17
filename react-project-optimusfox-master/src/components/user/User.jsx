export function User({user}) {
  const {id, name, role, age} = user;

  return (
    <div>
      <h1>{name}</h1>
      <h2>Role as {role}</h2>
      <h2>{age} years old</h2>
    </div>
  );
}
