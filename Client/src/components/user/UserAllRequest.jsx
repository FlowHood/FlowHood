import React, { useEffect, useState } from "react";
import UserRequestContainer from "../UserRequestContainer";
import RequestFilterBar from "./filterBar/RequestFilterBar";
import { ROL, getHighestPriorityRole } from "../../lib/rol";
import ScrollToTopButton from "../ScrollToTopButton";
import Button from "../buttons/Button";
import { VIEWS } from "../../lib/views";
import { Link } from "react-router-dom";
import {
  getAllRequestsByVisitor,
  getAllRequestsInMyHouse,
} from "../../services/request.service";
import Loading, { LoadingComponent } from "../Loading";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

const getScreenInformation = (rol) => {
  let title;
  let subTitle;
  let subTitle2;

  switch (rol) {
    case ROL.RESIDENT:
      title = "Crear invitacion para visitas";
      subTitle =
        "Crea y mantente pendiente del estado de las invitaciones que generes para tus invitados.";
      subTitle2 = "Mantente pendiente del estado de tus solicitudes";
      break;
    case ROL.OWNER:
      title = "Invitaciones de visitantes a tu hogar";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas de tu hogar o crea una nueva.";
      subTitle2 =
        "Gestiona las solicitudes de invitación de los integrantes de tu hogar.";
      break;

    case ROL.VISITOR:
      title = "Tus Invitaciones de visitas";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas por los integrantes de tu hogar o crea la tuya propia.";

      break;
    default:
      title = "Invitaciones de visitantes a tu hogar";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas de tu hogar o crea una nueva.";
      subTitle2 =
        "Gestiona las solicitudes de invitación de los integrantes de tu hogar.";
      break;
  }

  return {
    title,
    subTitle,
    subTitle2,
  };
};

export default function UserAllRequest() {
  const { user } = useAuth();

  const highestRole = getHighestPriorityRole(user.roles);

  let { title, subTitle, subTitle2 } = getScreenInformation(highestRole);
  const [requests, setRequests] = useState([]);
  const [allrequests, setAllRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("PEN");

  const isUniqueRolVisitor =
    user.roles.length === 1 &&
    user.roles.every((rol) => rol.id === ROL.VISITOR);

  useEffect(() => {
    const fetchRequests = async () => {
      let result;
      if (isUniqueRolVisitor) {
        result = await getAllRequestsByVisitor();
        setRequests(result);
      } else {
        result = await getAllRequestsInMyHouse();
        const filteredRequests = allrequests.filter(
          (request) => request.status === filter,
        );
        console.log("tfilteredRequests", filteredRequests);

        setRequests(filteredRequests);
      }
      setAllRequests(result);
      setIsLoading(false);
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!isUniqueRolVisitor) {
        const filteredRequests = allrequests.filter(
          (request) => request.status === filter,
        );

        setRequests(filteredRequests);
        return;
      }
    };

    fetchRequests();
  }, [allrequests, filter]);

  const now = moment();

  const sortedRequests = requests.sort((a, b) => {
    const aStart = moment(`${a.startDate.split("T")[0]} ${a.startTime}`);
    const bStart = moment(`${b.startDate.split("T")[0]} ${b.startTime}`);
    const aEnd = moment(`${a.endDate.split("T")[0]} ${a.endTime}`);
    const bEnd = moment(`${b.endDate.split("T")[0]} ${b.endTime}`);

    const aIsActive = now.isBetween(aStart, aEnd);
    const bIsActive = now.isBetween(bStart, bEnd);

    const aHasPassed = now.isAfter(aEnd);
    const bHasPassed = now.isAfter(bEnd);

    const aQrAvailable = now.isBetween(
      aStart.clone().subtract(30, "minutes"),
      aEnd.clone().add(30, "minutes"),
    );
    const bQrAvailable = now.isBetween(
      bStart.clone().subtract(30, "minutes"),
      bEnd.clone().add(30, "minutes"),
    );

    if (aQrAvailable && !bQrAvailable) return -1;
    if (!aQrAvailable && bQrAvailable) return 1;

    if (aIsActive && !bIsActive) return -1;
    if (!aIsActive && bIsActive) return 1;

    if (aHasPassed && !bHasPassed) return 1;
    if (!aHasPassed && bHasPassed) return -1;

    return aStart.diff(bStart);
  });

  const listOfItems =
    sortedRequests.map((request) => {
      const startDate = moment(
        `${request.startDate.split("T")[0]} ${request.startTime}`,
      );
      const endDate = moment(
        `${request.endDate.split("T")[0]} ${request.endTime}`,
      );

      const isActive = now.isBetween(startDate, endDate);
      const hasPassed = now.isAfter(endDate);

      const qrAvailable = now.isBetween(
        startDate.clone().subtract(30, "minutes"),
        endDate.clone().add(30, "minutes"),
      );

      return (
        <UserRequestContainer
          userName={request.visitor.name}
          date={request.startDate.split("T")[0]}
          time={
            request.startTime === request.endTime
              ? request.startTime
              : `${request.startTime} - ${request.endTime}`
          }
          key={request.id}
          to={`${VIEWS.requestDetail.replace("/:id", "")}/${request.id}`}
          address={request.house.address}
          reason={request.reason}
          status={request.status}
          isActive={isActive}
          hasPassed={hasPassed}
          qrAvailable={qrAvailable}
        />
      );
    }) || [];

  const handleChangeSelected = (selected) => {
    setFilter(selected);
  };

  return (
    <div className="flex min-h-[80vh] w-full min-w-32 flex-col items-center gap-3 px-4 font-Inter">
      <div className="flex w-11/12 flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-[0.75rem] font-light sm:text-base">{subTitle}</p>
      </div>
      <div className="flex w-full flex-col sm:w-11/12">
        <div className="flex min-h-screen flex-col gap-4">
          {isUniqueRolVisitor ? (
            <div className="flex flex-col gap-1">
              <h2 className="mt-8 text-center text-lg font-semibold text-royal-amethyst sm:text-3xl">
                Solicitudes a mi nombre
              </h2>
            </div>
          ) : (
            <RequestFilterBar
              rol={user.roles[0].id}
              handleChangeSelected={handleChangeSelected}
            />
          )}

          <div className="h-full w-full ">
            <div className="grid w-full flex-1 grid-cols-1 grid-rows-[max-content] flex-col justify-start gap-2 pb-8 sm:px-4 lg:grid-cols-2">
              {isLoading ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center lg:col-span-2">
                  <LoadingComponent />
                </div>
              ) : listOfItems.length > 0 ? (
                listOfItems
              ) : (
                <div className="flex flex-col items-center gap-2 text-center lg:col-span-2">
                  <p className="text-[0.75rem] font-light sm:text-base">
                    No hay solicitudes
                  </p>
                </div>
              )}
            </div>
          </div>

          {!isUniqueRolVisitor && (
            <div className="sticky bottom-[4.2rem] flex flex-col items-center justify-center gap-2 bg-white p-3 sm:bottom-0">
              <div className="hidden flex-row items-center justify-center gap-1 text-gray-600 sm:flex">
                <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
                <p>Ó</p>
                <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
              </div>
              <Button as={Link} to={VIEWS.createRequest}>
                Crear invitación
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollToTopButton scrollClassname="bottom-[4.8rem] right-5" />
    </div>
  );
}
