import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_board():
    response = client.get("/boards/test-board")
    assert response.status_code == 200
    assert "name" in response.json()

def test_update_board():
    response = client.put(
        "/boards/test-board",
        json={"name": "Updated Board"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Board"