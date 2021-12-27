<?php

class GlobalMethods
{
  protected $pdo;

  public function __construct(\PDO $pdo)
  {
    $this->pdo = $pdo;
  }
  public function executeQuery($sql)
  {
    $data = array();
    $errmsg = "";
    $code = 0;

    try {
      if ($result = $this->pdo->query($sql)->fetchAll()) {
        foreach ($result as $record) {
          array_push($data, $record);
        }
        $code = 200;
        return array("code" => $code, "data" => $data);
      } else {
        $errmsg = 'No data found';
        $code = 404;
      }
    } catch (\PDOException $e) {
      $errmsg = $e->getMessage();
      $code = 403;
    }
    return array("code" => $code, "errmsg" => $errmsg);
  }
  public function returnPayload($payload, $remarks, $message, $code)
  {

    $status = array("remarks" => $remarks, "message" => $message);
    http_response_code($code);
    return array("status" => $status, "payload" => $payload, "timestamp" => date_create());
  }
  public function insert($table_name, $data)
  {
    $fields = [];
    $values = [];

    foreach ($data as $key => $value) {
      array_push($fields, $key);
      array_push($values, $value);
    }

    try {
      $counter = 0;
      $sql_str = "INSERT INTO $table_name (";

      foreach ($fields as $value) {
        $sql_str .= $value;
        $counter++;
        if ($counter < count($fields)) {
          $sql_str .= ", ";
        }
      }

      $sql_str .= ") VALUES (" . str_repeat('?, ', count($values) - 1) . "?)";
      $sql = $this->pdo->prepare($sql_str);
      $sql->execute($values);
      return array("code" => 200, "remarks" => "success");
    } catch (Exception $e) {
      $errmsg = $e->getMessage();
      $code = 403;
    }
    return array("code" => $code, "errmsg" => $errmsg);
  }
  public function update($table_name, $data)
  {
    $fields = [];
    $values = [];
    foreach ($data as $key => $value) {
      array_push($fields, $key);
      array_push($values, $value);
    }

    try {
      $counter = 0;
      $sql_str = "UPDATE $table_name SET ";
      foreach ($fields as $index => $value) {
        if ($value === "id") {
          // do nothing..
        } else {
          $sql_str .= " $value = '$values[$index]',";
        }
      }
      $sql_str = rtrim($sql_str, ',');
      $sql_str .= " WHERE id = $data->id;";
      $sql = $this->pdo->prepare($sql_str);
      $sql->execute();
      return array("code" => 200, "remarks" => "success");
    } catch (Exception $e) {
      $errmsg = $e->getMessage();
      $code = 403;
    }
    return array("code" => $code, "errmsg" => $errmsg);
  }
  public function delete($table_name, $condition_string)
  {
    $sql = "DELETE FROM $table_name ";
    if ($condition_string != null) {
      $sql .= " WHERE {$condition_string}";
    }
    try {
      $sql = $this->pdo->prepare($sql);
      $sql->execute();
      return array("status code" => 200, "remarks" => "deleted successfully!");
    } catch (Exception $e) {
      $errmsg = $e->getMessage();
      $code = 403;
    }
    return array("code" => $code, "errmsg" => $errmsg);
  }
}
