import { ApiBaseRepository, Modules, ApiResponseError } from "./base.repository";
import { cookies } from "next/headers";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { RoleType } from "@/core/domain/entities/role.type";
import { setJwtUC } from "@/core/application/usecases/services/auth";

export class ApiUserRepository extends ApiBaseRepository {
  constructor(baseUrl?: string) {
    super(Modules.USER, baseUrl);
  }
  async readAll() {
    console.log(this.getEndpointModule("readAll"));
    const jwt = (await cookies()).get("jwt");

    const response = await fetch(this.getEndpointModule("readAll"), {
      method: this.endpoints.readAll.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
      },
    });
    if (!response.ok)
      throw new ApiResponseError("readAll", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error reading all users: ${response.statusText}`,
      });
    return await response.json();
  }
  async login(data: { payload: VerifyLoginPayloadParams }) {
    const jwt = (await cookies()).get("jwt");
    console.log("login... :", this.getEndpointModule("login"));
    console.log(data.payload);
    const response = await fetch(this.getEndpointModule("login"), {
      method: this.endpoints.login.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
        "x-signed-payload": `${JSON.stringify(data.payload)}`,
      },
    });
    console.log(response);
    if (!response.ok)
      throw new ApiResponseError("create", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error creating user: ${response.statusText}`,
      });
    return await response.json();
  }
  async readById(id: string) {
    const response = await fetch(
      this.getEndpointModule("readById").replace(":id", id),
      {
        method: this.endpoints.readById.method,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok)
      throw new ApiResponseError("readById", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error reading user by ID: ${response.statusText}`,
      });
    return await response.json();
  }
}
