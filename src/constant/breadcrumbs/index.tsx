

export const galleryString = "Media";
export const residentString = "Penghuni";
export const paymentString = "Pembayaran";

const manageString = "Kelola %s";
const listString = "Daftar %s";

const createTitleAndBreadcrumbs = (entityName: string, url: string) => {
  const manageEntityString = manageString.replace("%s", entityName);
  const listEntityString = listString.replace("%s", entityName);
  const addEntityTitle = `Tambah ${entityName}`;

  const breadcrumbsIndex = [
    { name: manageEntityString, url: "/" },
    { name: listEntityString, url: `/${url}` },
  ];

  const breadcrumbsAdd = [
    { name: manageEntityString, url: "/" },
    { name: listEntityString, url: `/${url}` },
    { name: addEntityTitle, url: `/${url}/add` },
  ];

  return {
    title: manageEntityString,
    breadcrumbsIndex,
    addTitle: addEntityTitle,
    breadcrumbsAdd,
  };
};

export const galleries = createTitleAndBreadcrumbs(galleryString, "galleries");
export const residents = createTitleAndBreadcrumbs(residentString, "residents");
export const payments = createTitleAndBreadcrumbs(paymentString, "payments");

export const {
  title: galleriesTitle,
  breadcrumbsIndex: breadCrumbsGalleriesIndex,
  addTitle: galleriesAddTitle,
  breadcrumbsAdd: breadCrumbsGalleriesAdd,
} = galleries;

export const {
  title: residentsTitle,
  breadcrumbsIndex: breadCrumbsResidentsIndex,
  addTitle: residentsAddTitle,
  breadcrumbsAdd: breadCrumbsResidentsAdd,
} = residents;

export const {
  title: paymentsTitle,
  breadcrumbsIndex: breadCrumbsPaymentsIndex,
  addTitle: paymentsAddTitle,
  breadcrumbsAdd: breadCrumbsPaymentsAdd,
} = payments;
