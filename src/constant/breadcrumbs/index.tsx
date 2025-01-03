export const galleryString = "Media";
export const residentString = "Penghuni";
export const paymentString = "Pembayaran";

export const galleryUrl = "galleries";
export const residentUrl = "residents";
export const paymentUrl = "payments";

const manageString = "Kelola %s";
const listString = "Daftar %s";

export const createTitleAndBreadcrumbs = (
  entityName: string, 
  url: string, 
  editName: string | null = '', 
  id: string | null = null
) => {
  const manageEntityString = manageString.replace("%s", entityName);
  const listEntityString = listString.replace("%s", entityName);
  const addEntityTitle = `Tambah ${entityName}`;
  const editEntityTitle = `Ubah ${entityName}`;

  const breadcrumbsIndex = [
    { name: manageEntityString, url: "/" },
    { name: listEntityString, url: `/${url}` },
  ];

  const breadcrumbsAdd = [
    { name: manageEntityString, url: "/" },
    { name: listEntityString, url: `/${url}` },
    { name: addEntityTitle, url: `/${url}/add` },
  ];

   const breadcrumbsEdit = id
    ? [
        { name: manageEntityString, url: "/" },
        { name: listEntityString, url: `/${url}` },
        { name: editName || `Edit ${entityName}`, url: `/${url}/edit/${id}` },
      ]
    : [];

   return {
    indexTitle: manageEntityString,
    breadcrumbsIndex,
    addTitle: addEntityTitle,
    breadcrumbsAdd,
    editTitle: editEntityTitle,
    breadcrumbsEdit,
  };
};
