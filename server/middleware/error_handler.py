from fastapi import Request, Response
from fastapi.responses import JSONResponse
from typing import Union

async def error_handler_middleware(request: Request, call_next) -> Union[Response, JSONResponse]:
    try:
        return await call_next(request)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": str(e)}
        )