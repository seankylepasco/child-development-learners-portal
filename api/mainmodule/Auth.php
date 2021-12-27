<?php
class Auth
{
  protected $pdo;
  protected $gm;

  public function __construct(\PDO $pdo)
  {
    $this->pdo = $pdo;
    $this->gm = new GlobalMethods($pdo);
  }


  // password checking
  private function check_password($password, $existing_hash)
  {
    $hash = crypt($password, $existing_hash);
    if ($hash === $existing_hash) {
      return true;
    }
    return false;
  }
  // password encryption
  private function encrypt_password($password_string)
  {
    $hash_format = '$2y$10$';
    $salt_length = 22;
    $salt = $this->generate_salt($salt_length);
    return crypt($password_string, $hash_format . $salt);
  }
  // generation key/salt
  private function generate_salt($length)
  {
    $urs = md5(uniqid(mt_rand(), true));
    $b64_string = base64_encode($urs);
    $mb64_string = str_replace('+', '.', $b64_string);
    return substr($mb64_string, 0, $length);
  }
  // generate token
  private function generate_token($id)
  {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode(['user_id' => $id]);
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, 'abC123!', true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    $jwt = $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    return $jwt;
  }
  public function update_user($table, $received_data)
  {
    if (property_exists($received_data, 'password')) {
      $received_data->password = $this->encrypt_password($received_data->password);
    }
    $res = $this->gm->update($table, $received_data);
    if ($res['code'] == 200) {
      return $this->gm->returnPayload(null, 'success', 'successfully updated data', $res['code']);
    }
    return $this->gm->returnPayload(null, 'failed', 'failed to update data', $res['code']);
  }
  public function register($received_data)
  {
    $received_data->password = $this->encrypt_password($received_data->password);
    $res = $this->gm->insert('tbl_users', $received_data);
    if ($res['code'] == 200) {
      return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
    }
    return $this->gm->returnPayload(null, 'failed', 'failed to insert data', $res['code']);
  }
  public function login($received_data)
  {
    $email = $received_data->email;
    $pword = $received_data->password;
    $sql = 'SELECT * FROM `tbl_users` WHERE email = ? ';
    $stmt = $this->pdo->prepare($sql);
    try {
      $stmt->execute([$email]);
      if ($stmt->rowCount() > 0) {
        $res = $stmt->fetchAll()[0];
        if ($this->check_password($pword, $res['password'])) {
          $id = $res['id'];
          $firstname = $res['firstname'];
          $lastname = $res['lastname'];
          $email = $res['email'];
          $img = $res['img'];
          $type = $res['type'];
          $token = $this->generate_token($res['id']);
          $code = 200;
          $remarks = 'success';
          $message = 'Logged in successfully.';
          $payload = array(
            'id' => $id,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'type' => $type,
            'img' => $img,
            'token' => $token
          );
          return $this->gm->returnPayload($payload, $remarks, $message, $code);
        } else {
          $code = 401;
          $remarks = 'failed';
          $message = 'Invalid username or password.';
          $payload = null;
        }
      } else {
        $code = 401;
        $remarks = 'failed';
        $message = 'Invalid username or password.';
        $payload = null;
      }
    } catch (Exception $e) {
      $code = 401;
      $remarks = 'failed';
      $message = 'Invalid username or password.';
      $payload = null;
    }
    $code = 200;
    return $this->gm->returnPayload($payload, $remarks, $message, $code);
  }
}
