<?php

class Get
{

  protected $pdo;
  protected $gm;

  public function __construct(\PDO $pdo)
  {
    $this->pdo = $pdo;
    $this->gm = new GlobalMethods($pdo);
  }

  public function get_common($table, $condition = null)
  {
    $sql = "SELECT * FROM $table";
    if ($condition != null) {
      $sql .= " WHERE {$condition}";
    }
    $res = $this->gm->executeQuery($sql);
    if ($res['code'] == 200) {
      return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
    }
    return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
  }

  public function get_last($table, $condition = null)
  {
    $sql = "SELECT id FROM $table";
    if ($condition != null) {
      $sql .= " WHERE {$condition}";
    } else {
      $sql .= " ORDER BY id DESC LIMIT 1";
    }
    $res = $this->gm->executeQuery($sql);
    if ($res['code'] == 200) {
      return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved last id", $res['code']);
    }
    return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
  }

  public function get_query($sql)
  {
    $res = $this->gm->executeQuery($sql);
    if ($res['code'] == 200) {
      return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
    }
    return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
  }
}
