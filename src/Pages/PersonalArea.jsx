import React, { useEffect, useState } from "react";
import unknownFileType from "../images/file_unknown_icon.png";
import { Button, List as ListANTD } from "antd";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllFilesFromStore,
  deleteFileFromContainer,
  setFileInContainer,
} from "../redux/fileContainer";
import {
  documentFileIcons,
  documentFileTypes,
  imageFileType,
} from "../constants/index.js";
import { NotAuthorizedUser } from "./NotAuthorizedUser.jsx";
import { useNavigate } from "react-router";
import { deleteTokenFromContainer } from "../redux/token/store.js";
import { setFilesFromServerInContainer } from "../redux/filesFromServerContainer/store.js";
import noImage from "../images/noImage.jpg";

const StyledListItemMeta = styled(ListANTD.Item.Meta)`
  margin: 0px !important;
  align-items: center !important;
`;
const StyledListItem = styled(ListANTD.Item)`
  .ant-list-item-extra {
    display: flex;
    align-items: center;
  }
`;
const StyledFileIcon = styled.img`
  width: 50px;
  height: 50px;
  border: 1px dashed gray;
  border-radius: 12px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 10px;
`;
const UploadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #cdc8c8;
  border-radius: 8px 8px 0px 0px;
`;
const FileContainer = styled.div`
  margin: auto;
  width: 1000px;
  border: 1px solid black;
  border-radius: 8px 8px 8px 8px;
  background: white;
`;
const ServerFileSContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  padding-bottom: 10px;
  width: 1000px;
  background: white;
  border: 1px solid black;
  border-radius: 8px 8px 8px 8px;
`;
const StyledButton = styled(Button)`
  border: 1px solid black;
`;

export function PersonalArea() {
  const token = useSelector((state) => state.tokenContainer.tokenContainer);
  const items = useSelector((state) => state.filesContainer.filesInContainer);
  const serverFiles = useSelector(
    (state) => state.filesFromServerContainer.filesFromServerContainer
  );
  const navigate = useNavigate();
  const [downloadedFileSize, setDownloadedFileSize] = useState(0);
  const dispatch = useDispatch();
  const filesSizeInConteiner = items.reduce((acc, item) => {
    acc += item.size;
    return acc;
  }, 0);

  const message = (
    <p style={{ color: "red" }}>
      Суммарный вес загружаемых файлов не должен превышать 1 Мбайт. Вы
      попытались загрузить файлы общим объёмом в{" "}
      {(downloadedFileSize / 1048576).toFixed(2)} Мбайт, часть файлов не была
      загружена.
    </p>
  );

  // Функция срабатывает при добавлении файлов через input.
  // Сортирует файлы по объёму.
  // Добавляет к файлам ссылку на URL для возможности отображения превью картинок.
  const handleOnChange = (event) => {
    event.preventDefault();
    let numberOfFiles = 0;
    let loadedFilesCounter = 0;
    let sumFileSize = filesSizeInConteiner;
    let totalFileSize = filesSizeInConteiner;
    let maxFileSize = 20 - serverFiles.length;
    let temp = [];

    if (event.target.files && event.target.files.length) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        if (
          sumFileSize + files[i].size < 1048576 &&
          numberOfFiles <= maxFileSize
        ) {
          temp.push(files[i]);
          numberOfFiles++;
          sumFileSize = sumFileSize + files[i].size;
          totalFileSize = totalFileSize + files[i].size;
        } else {
          totalFileSize = totalFileSize + files[i].size;
        }
      }

      setDownloadedFileSize(totalFileSize);

      for (let i = 0; i < temp.length; i++) {
        const fileReader = new FileReader();
        let fileType = temp[i].name.split(".");
        fileType = fileType[fileType.length - 1];

        fileReader.readAsDataURL(temp[i]);

        fileReader.onloadend = () => {
          temp[i].imageUrl = fileReader.result;
          loadedFilesCounter++;

          if (loadedFilesCounter === numberOfFiles) {
            for (let i = 0; i < temp.length; i++) {
              dispatch(setFileInContainer(temp[i]));
            }
          }
        };
      }
    }
  };

  //Фукнция удаления загруженного файла.
  const handleClick = (e, item) => {
    e.stopPropagation();
    dispatch(deleteFileFromContainer(item.name));
  };

  //Фукнция выхода из личного кабинета.
  const exitClick = async () => {
    fetch("https://js-test.kitactive.ru/api/logout", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then(() => {
        navigate("/");
        dispatch(deleteAllFilesFromStore());
        dispatch(deleteTokenFromContainer());
      })
      .catch((err) => alert("Произошла ошибка, попробуйте еще раз"));
  };

  //Функция загрузки файлов на сервер.
  const uploadClick = async () => {
    const formData = new FormData();

    for (let i = 0; i < items.length; i++) {
      formData.append("files[]", items[i]);
    }

    try {
      fetch("/api/media/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => (response.ok ? response : Promise.reject(response)))
        .then(() => {
          dispatch(deleteAllFilesFromStore());
        })
        .then(() =>
          fetch("https://js-test.kitactive.ru/api/media", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((json) => {
              dispatch(setFilesFromServerInContainer(json.files));
            })
        )
        .catch((err) => {
          alert("Произошла ошибка, попробуйте еще раз");
        });
    } catch (e) {
      alert("Произошла ошибка, попробуйте еще раз");
    }
  };

  //Загрузка файлов, хранящихся на сервере, при первом рендере.
  useEffect(() => {
    fetch("https://js-test.kitactive.ru/api/media", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setFilesFromServerInContainer(json.files));
      });
  }, []);

  //Функция удаления определенного файла с сервера.
  const deleteClick = async (e, item) => {
    e.stopPropagation();
    fetch(`https://js-test.kitactive.ru/api/media/${item}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .catch((err) => {
        alert("Произошла ошибка, попробуйте еще раз");
      });
  };
  // Функция обновления информации о файлах, хранящихся на сервере.
  const updateInfoFromServer = async (e) => {
    e.stopPropagation();
    fetch("https://js-test.kitactive.ru/api/media", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setFilesFromServerInContainer(json.files));
      })
      .catch((err) => {
        alert("Произошла ошибка, попробуйте еще раз");
      });
  };

  // Функция скачивания файла с сервера.
  const downloadClick = async (e, item) => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);

    fetch(`https://js-test.kitactive.ru/api/media/${item.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        let objectUrl = window.URL.createObjectURL(blob);

        anchor.href = objectUrl;
        anchor.download = item.fileName;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        anchor.remove();
      })
      .catch((err) => {
        alert("Произошла ошибка, попробуйте еще раз");
      });
  };

  if (!token) {
    return <NotAuthorizedUser />;
  } else {
    return (
      <div>
        <h1
          style={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          Личный кабинет
        </h1>
        <FileContainer>
          <Header>
            <h2
              style={{
                margin: "0px",
                padding: "20px",
              }}
            >
              Файлов загружено: {items.length}
            </h2>
            <StyledButton
              style={{ marginRight: "20px" }}
              onClick={() => exitClick()}
            >
              Покинуть личный кабинет
            </StyledButton>
          </Header>
          <ListANTD
            itemLayout="vertical"
            dataSource={items}
            style={{ marginLeft: "20px", marginRight: "20px" }}
            pagination={{
              align: "center",
              pageSize: 10,
            }}
            renderItem={(item) => {
              let fileType = item.name.split(".");
              fileType = fileType[fileType.length - 1];

              return (
                <ListANTD.Item
                  extra={
                    <CloseOutlined onClick={(e) => handleClick(e, item)} />
                  }
                >
                  <StyledListItemMeta
                    avatar={
                      <StyledFileIcon
                        src={
                          imageFileType[fileType]
                            ? item.imageUrl
                            : documentFileTypes[fileType]
                            ? documentFileIcons[fileType]
                            : unknownFileType
                        }
                        alt="preview"
                      />
                    }
                    title={item.name}
                  />
                </ListANTD.Item>
              );
            }}
          />
          <StyledForm>
            <input type="file" multiple onChange={handleOnChange} />
            {downloadedFileSize > 1048576 ? message : <></>}
          </StyledForm>
          <UploadButtonContainer>
            <Button
              type="primary"
              disabled={items.length !== 0 ? false : true}
              onClick={() => uploadClick()}
            >
              Отправить файлы на сервер
            </Button>
          </UploadButtonContainer>
        </FileContainer>

        <ServerFileSContainer>
          <Header>
            <h2
              style={{
                margin: "0px",
                padding: "20px",
              }}
            >
              Файлов на сервере: {serverFiles.length}
            </h2>
            <StyledButton
              style={{ marginRight: "20px" }}
              onClick={(e) => updateInfoFromServer(e)}
            >
              Обновить
            </StyledButton>
          </Header>
          <ListANTD
            itemLayout="vertical"
            dataSource={serverFiles}
            style={{ marginLeft: "20px", marginRight: "20px" }}
            pagination={{
              align: "center",
              pageSize: 10,
            }}
            renderItem={(item) => {
              let fileType = item.fileName.split(".");
              fileType = fileType[fileType.length - 1];

              return (
                <StyledListItem
                  extra={
                    <>
                      <StyledButton
                        style={{ marginRight: "10px" }}
                        onClick={(e) => downloadClick(e, item)}
                      >
                        Скачать
                      </StyledButton>
                      <StyledButton onClick={(e) => deleteClick(e, item.id)}>
                        Удалить
                      </StyledButton>
                    </>
                  }
                >
                  <StyledListItemMeta
                    avatar={
                      <StyledFileIcon
                        src={
                          imageFileType[fileType]
                            ? noImage
                            : documentFileTypes[fileType]
                            ? documentFileIcons[fileType]
                            : unknownFileType
                        }
                        alt="preview"
                      />
                    }
                    title={item.fileName}
                  />
                </StyledListItem>
              );
            }}
          />
        </ServerFileSContainer>
      </div>
    );
  }
}
