import { useCallback, useState } from 'react';

const useForm = (init = {}) => {
  const [obj, setObj] = useState(init);
  const onChange = useCallback(
    (e) => {
      setObj({
        ...obj,
        [e.target.name]: e.target.value,
      });
    },
    [obj],
  );

  return [obj, onChange];
};

export default useForm;
