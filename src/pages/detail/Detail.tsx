import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();

  return <div>Detail for ID: {id}</div>;
};

export default Detail;
