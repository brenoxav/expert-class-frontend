import { useParams } from 'react-router';

function ClassDetails() {
  const { id } = useParams();

  return (
    <div>
      {`Class Id ${id}`}
    </div>
  );
}

export default ClassDetails;
