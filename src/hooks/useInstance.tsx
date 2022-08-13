import { useContext, useEffect, useState } from 'react';

import { CategoriesContext } from 'src/context/CategoriesContext';
import { ExpensesContext } from 'src/context/ExpensesContext';
import { InstanceContext } from 'src/context/InstanceContext';

const useInstance = () => {
  const {
    instance,
    loading: instanceLoading,
    refetchInstance,
  } = useContext(InstanceContext);
  const { categories, loading: categoriesLoading } =
    useContext(CategoriesContext);
  const { expenses, loading: expensesLoading } = useContext(ExpensesContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (instanceLoading || categoriesLoading || expensesLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    instanceLoading,
    categoriesLoading,
    expensesLoading,
    categories,
    expenses,
  ]);

  return {
    instance,
    categories,
    expenses,
    loading,
    refetchInstance,
  };
};

export default useInstance;
