import React, { Suspense } from 'react';
import { Button } from '@/components/Button';
import {
  CardDeleteButton,
  CardDeleteButtonContainer,
} from './DeleteProjectModal.styles';
import {
  namedOperations,
  useDestroyProjectMutation,
} from '@/lib/client/graphql/generated';
import { useModal } from '@/hooks/useModal';
const Modal = React.lazy(() => import('@/hooks/useModal'));

interface CardDeleteProjectProps {
  projectId: string;
}

export const CardDeleteProject = ({ projectId }: CardDeleteProjectProps) => {
  const [destroyProject, { loading }] = useDestroyProjectMutation();

  const [modalOptions, toggle] = useModal({
    animated: true,
    title: 'Are you sure you want to delete this project?',
    message:
      'All project data will be permanently deleted. This cannot be undone.',
    icon: <WarningIcon />,
    buttons: [
      <Button
        label="Delete project"
        isDestructive
        isLoading={loading}
        onClickHandler={() => onSubmitHandler()}
      />,
      <Button label="Nevermind" isCancel onClickHandler={() => toggle()} />,
    ],
  });

  const onSubmitHandler = async () => {
    try {
      await destroyProject({
        variables: { projectId },
        refetchQueries: [namedOperations.Query.GetProjectsByUserId],
      });
      toggle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CardDeleteButtonContainer onClick={toggle}>
        <CardDeleteButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </CardDeleteButton>
      </CardDeleteButtonContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalOptions} />
      </Suspense>
    </>
  );
};

const WarningIcon = () => {
  return (
    <div className="text-red-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="none"
        className="StyledAlertTriangleIcon-sc-ypewwi-2 iRJfAt"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11 16a1 1 0 112 0 1 1 0 01-2 0zm1.75-3V7h-1.5v6h1.5z"
        ></path>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10.488.719a3.75 3.75 0 013.024 0c.627.276 1.115.795 1.588 1.452.471.652.996 1.54 1.659 2.664l4.622 7.827c.683 1.158 1.223 2.072 1.576 2.818.354.75.578 1.442.51 2.136a3.75 3.75 0 01-1.52 2.661c-.563.412-1.273.572-2.098.648-.822.075-1.884.075-3.228.075H7.378c-1.344 0-2.405 0-3.227-.075-.826-.076-1.536-.236-2.1-.648a3.75 3.75 0 01-1.518-2.66c-.068-.695.155-1.388.51-2.137.353-.746.892-1.66 1.576-2.818L7.24 4.835c.663-1.123 1.187-2.012 1.658-2.664.474-.657.961-1.176 1.589-1.452zm2.419 1.372a2.25 2.25 0 00-1.814 0c-.256.113-.55.365-.977.957-.426.59-.916 1.419-1.604 2.583l-4.581 7.76c-.708 1.199-1.212 2.054-1.532 2.73-.322.68-.401 1.069-.373 1.349a2.25 2.25 0 00.91 1.597c.228.166.602.295 1.352.364.745.068 1.738.07 3.13.07h9.164c1.392 0 2.384-.002 3.13-.07.75-.069 1.123-.198 1.35-.364a2.25 2.25 0 00.912-1.597c.028-.28-.051-.668-.373-1.349-.32-.676-.824-1.531-1.532-2.73l-4.582-7.76c-.688-1.164-1.178-1.993-1.603-2.583-.427-.592-.722-.844-.977-.957z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
